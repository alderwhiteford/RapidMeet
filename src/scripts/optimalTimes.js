import moment from "moment-timezone";

const TIME_INCREMENT = 1800000;
const SCORE_SCALE = 0.5;

const STARTING_SCORES = {
  0: 1,
  1: 0.8,
  2: 0.65,
  3: 0.55,
  4: 0.45,
  5: 0.40,
  6: 0.35,
  7: 0.31,
  8: 0.27,
  9: 0.23
};

function epochTimeToDate(epochTime, timezone) {
  const datetimeObjectUtc = moment.utc(parseInt(epochTime));
  const datetimeInTimezone = datetimeObjectUtc.tz(timezone);
  return datetimeInTimezone.format('YYYY-MM-DD');
}

function hasAllRequiredAttendees(requiredAttendees, userSet) {
  let hasAllAttendees = true 
  requiredAttendees.forEach((attendee) => {
    if (!userSet.has(parseInt(attendee))) {
      hasAllAttendees = false
    }
  })
  return hasAllAttendees
}

function convertToDates(availability, timezoneStr) {
  const dates = {};

  // Retrieve and sort the keys. Ensures that the dates and times are in order:
  const keys = Object.keys(availability).sort((a, b) => a - b);

  // Iterate across the keys in the availability dictionary:
  for (const key of keys) {
    // Format the date:
    const formattedDate = epochTimeToDate(key, timezoneStr);

    // Add the timestamps to their respective date groupings:
    if (!dates[formattedDate]) {
      dates[formattedDate] = [key];
    } else {
      dates[formattedDate].push(key);
    }
  }

  return dates;
}

function identifyStartingBlocks(dates, day, availability, requiredAttendees) {
  let users = new Set([]);
  const timeBlocks = [];
  let lastTime = '0'

  // Iterate across each time in a day:
  for (const time of dates[day]) {
    // If there has been a gap in availability, remove everyone from the currently tracked users:
    if (parseInt(time) - parseInt(lastTime) > TIME_INCREMENT) {
      users = new Set([]);
    }

    // Extract the available users at a given time:
    const availableUsers = availability[time];
    const setOfAvailableUsers = new Set(availableUsers);

    // Find which users are no longer in the time block and which users are now in the time block:
    const usersToAdd = new Set(availableUsers.filter(user => !users.has(user)));
    const usersToRemove = new Set([...users].filter(user => !availableUsers.includes(user)));

    // If new users are being added and all required attendees are present, mark the timeslot as a beginning timestamp:
    if (usersToAdd.size > 0 && hasAllRequiredAttendees(requiredAttendees, setOfAvailableUsers)) {
      timeBlocks.push(time);
    }

    // Update the user set:
    users = new Set([...users, ...Array.from(usersToAdd)].filter(user => !usersToRemove.has(user)));

    lastTime = time;
  }

  return timeBlocks;
}

export function findOptimalTime(availability, timezoneStr, meetingLength, numMeetings, requiredAttendees) {
  // Confirm meeting length validity:
  if (meetingLength > 10 || meetingLength <= 0) {
    return [];
  }

  const dates = convertToDates(availability, timezoneStr);

  // Retrieve the keys:
  const keys = Object.keys(dates);
  let optimalTimes = {};
  let optimalTimesScore = {};

  // Iterate across each day:
  for (const key of keys) {
    // Find the starting point for each day
    const timeBlockStartingPoints = identifyStartingBlocks(dates, key, availability, requiredAttendees);
    let optimalTime = [];
    let optimalTimeScore = 0;

    // For each starting time block:
    for (const time of timeBlockStartingPoints) {
      const userScores = {};
      let timeScore = 0;
      const timeBlocks = [];
      const userSet = new Set([]);

      // iterate through the number of time slots matching meeting length:
      for (let i = 0; i < meetingLength; i++) {
        // Compute the next time slot:
        const newTime = parseInt(time) + (i * TIME_INCREMENT);
        timeBlocks.push(newTime);

        // If the timeslot exists in availability and is still within the same day:
        const epochAsDate = epochTimeToDate(newTime, timezoneStr);
        if (availability[newTime] && epochAsDate === key) {
          const usersAvailableAtTime = availability[newTime];

          // compute user scores:
          for (const user of usersAvailableAtTime) {
            // If it is their first time showing up, assign them a score based on the initial score mapping:
            if (!userScores[user]) {
              userScores[user] = STARTING_SCORES[i];
              timeScore += userScores[user];

              // Track that the user exists in the timeslot
              userSet.add(user)
            } else {
              const scoreIncrease = userScores[user] * SCORE_SCALE;
              userScores[user] += scoreIncrease;
              timeScore += scoreIncrease;
            }
          }
        }
      }

      if (timeScore > optimalTimeScore && hasAllRequiredAttendees(requiredAttendees, userSet)) {
        optimalTimeScore = timeScore;
        optimalTime = timeBlocks;
      }
    }

    optimalTimes[key] = optimalTime
    optimalTimesScore[key] = optimalTimeScore
  }

  // Sort the optimal times by score:
  const allOptimalTimes = []
  const sortedTimesByScore = Object.keys(optimalTimes).sort((a, b) => optimalTimesScore[b] - optimalTimesScore[a]);
  
  if (sortedTimesByScore.length < numMeetings) {
    return [];
  }

  for (let i = 0 ; i < numMeetings ; i++) {
    allOptimalTimes.push(...optimalTimes[sortedTimesByScore[i]])
  }

  // If the algorithm cannot find optimal times for the requested settings, return an empty array:
  if (allOptimalTimes.length < (numMeetings * meetingLength)) {
    return []
  }

  console.log(allOptimalTimes);
  return allOptimalTimes;
}
