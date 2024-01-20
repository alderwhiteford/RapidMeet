from datetime import datetime, timedelta
import pytz

# Variables: 
timeZone = 'Eastern Time Zone'
length_of_meeting = 1
availability = {
    "1706009400000": [
        63345638,
        67281766
    ],
    "1706002200000": [
        63345638,
        67281766,
        -806808515
    ],
    "1706178600000": [
        67281766
    ],
    "1706211000000": [
        63345638,
        -806808515
    ],
    "1706106600000": [
        67281766,
        -806808515
    ],
    "1706218200000": [
        63345638,
        -806808515
    ],
    "1706005800000": [
        63345638,
        67281766
    ],
    "1706137200000": [
        63345638,
        -806808515
    ],
    "1706099400000": [
        67281766
    ],
    "1706122800000": [
        63345638,
        -806808515
    ],
    "1706045400000": [
        63345638,
        -806808515
    ],
    "1706108400000": [
        67281766,
        -806808515
    ],
    "1706265000000": [
        67281766
    ],
    "1706313600000": [
        63345638,
        67281766
    ],
    "1706263200000": [
        67281766
    ],
    "1706320800000": [
        63345638,
        67281766
    ],
    "1706049000000": [
        63345638,
        -806808515
    ],
    "1706052600000": [
        63345638,
        -806808515
    ],
    "1706112000000": [
        67281766,
        -806808515
    ],
    "1705987800000": [
        63345638
    ],
    "1706324400000": [
        63345638,
        67281766
    ],
    "1706023800000": [
        63345638
    ],
    "1706110200000": [
        67281766,
        -806808515
    ],
    "1706319000000": [
        63345638
    ],
    "1706304600000": [
        67281766
    ],
    "1706047200000": [
        63345638,
        -806808515
    ],
    "1706281200000": [
        63345638,
        67281766,
        -806808515
    ],
    "1706187600000": [
        67281766
    ],
    "1706295600000": [
        63345638,
        67281766
    ],
    "1706283000000": [
        63345638,
        67281766,
        -806808515
    ],
    "1706227200000": [
        63345638
    ],
    "1706022000000": [
        63345638
    ],
    "1706121000000": [
        63345638,
        -806808515
    ],
    "1706200200000": [
        63345638,
        -806808515
    ],
    "1706315400000": [
        63345638
    ],
    "1706113800000": [
        63345638,
        67281766,
        -806808515
    ],
    "1706193000000": [
        63345638
    ],
    "1706293800000": [
        63345638,
        67281766
    ],
    "1706311800000": [
        63345638,
        67281766
    ],
    "1706094000000": [
        67281766
    ],
    "1706016600000": [
        63345638
    ],
    "1706043600000": [
        63345638
    ],
    "1706250600000": [
        63345638,
        67281766
    ],
    "1706018400000": [
        63345638
    ],
    "1706058000000": [
        63345638,
        -806808515
    ],
    "1706259600000": [
        63345638,
        67281766
    ],
    "1706007600000": [
        63345638,
        67281766
    ],
    "1706059800000": [
        63345638,
        -806808515
    ],
    "1706292000000": [
        63345638,
        67281766
    ],
    "1706254200000": [
        63345638,
        67281766
    ],
    "1706322600000": [
        63345638,
        67281766
    ],
    "1706189400000": [
        67281766
    ],
    "1706247000000": [
        63345638
    ],
    "1706131800000": [
        63345638
    ],
    "1706236200000": [
        63345638
    ],
    "1706063400000": [
        63345638,
        -806808515
    ],
    "1706239800000": [
        63345638
    ],
    "1706065200000": [
        63345638
    ],
    "1706288400000": [
        63345638,
        67281766,
        -806808515
    ],
    "1706050800000": [
        63345638,
        -806808515
    ],
    "1706194800000": [
        63345638,
        -806808515
    ],
    "1706310000000": [
        67281766
    ],
    "1706130000000": [
        63345638
    ],
    "1706203800000": [
        63345638,
        -806808515
    ],
    "1706290200000": [
        63345638,
        67281766,
        -806808515
    ],
    "1706061600000": [
        63345638,
        -806808515
    ],
    "1706135400000": [
        63345638
    ],
    "1706234400000": [
        63345638
    ],
    "1706299200000": [
        63345638
    ],
    "1706284800000": [
        63345638,
        67281766,
        -806808515
    ],
    "1706257800000": [
        63345638,
        67281766
    ],
    "1706097600000": [
        67281766
    ],
    "1706232600000": [
        63345638
    ],
    "1705998600000": [
        63345638,
        67281766,
        -806808515
    ],
    "1706209200000": [
        63345638,
        -806808515
    ],
    "1706103000000": [
        67281766,
        -806808515
    ],
    "1706248800000": [
        63345638
    ],
    "1705996800000": [
        63345638,
        67281766,
        -806808515
    ],
    "1706308200000": [
        67281766
    ],
    "1706054400000": [
        63345638,
        -806808515
    ],
    "1706095800000": [
        67281766
    ],
    "1706185800000": [
        67281766
    ],
    "1705986000000": [
        63345638
    ],
    "1706286600000": [
        63345638,
        67281766,
        -806808515
    ],
    "1706196600000": [
        63345638,
        -806808515
    ],
    "1706279400000": [
        63345638,
        67281766,
        -806808515
    ],
    "1706104800000": [
        67281766,
        -806808515
    ],
    "1706014800000": [
        63345638
    ],
    "1706301000000": [
        63345638
    ],
    "1706020200000": [
        63345638
    ],
    "1706275800000": [
        63345638,
        -806808515
    ],
    "1706256000000": [
        63345638,
        67281766
    ],
    "1706220000000": [
        63345638
    ],
    "1706133600000": [
        63345638
    ],
    "1705993200000": [
        63345638,
        67281766,
        -806808515
    ],
    "1706306400000": [
        67281766
    ],
    "1706223600000": [
        63345638
    ],
    "1706191200000": [
        67281766
    ],
    "1706252400000": [
        63345638,
        67281766
    ],
    "1706056200000": [
        63345638,
        -806808515
    ],
    "1706205600000": [
        63345638,
        -806808515
    ],
    "1706297400000": [
        63345638
    ],
    "1706126400000": [
        63345638
    ],
    "1706180400000": [
        67281766
    ],
    "1706261400000": [
        63345638,
        67281766
    ],
    "1706101200000": [
        67281766
    ],
    "1706011200000": [
        63345638,
        67281766
    ],
    "1706230800000": [
        63345638
    ],
    "1706124600000": [
        63345638
    ],
    "1705995000000": [
        63345638,
        67281766,
        -806808515
    ],
    "1706326200000": [
        63345638
    ],
    "1706317200000": [
        63345638
    ],
    "1706128200000": [
        63345638
    ],
    "1706225400000": [
        63345638
    ],
    "1706004000000": [
        63345638,
        67281766,
        -806808515
    ],
    "1705989600000": [
        63345638
    ],
    "1706229000000": [
        63345638
    ],
    "1706277600000": [
        63345638,
        67281766,
        -806808515
    ],
    "1706238000000": [
        63345638
    ],
    "1706115600000": [
        63345638,
        -806808515
    ],
    "1706013000000": [
        63345638
    ],
    "1706198400000": [
        63345638,
        -806808515
    ],
    "1706221800000": [
        63345638
    ],
    "1706182200000": [
        67281766
    ],
    "1706119200000": [
        63345638
    ],
    "1706000400000": [
        63345638,
        67281766,
        -806808515
    ],
    "1706202000000": [
        63345638,
        -806808515
    ],
    "1706117400000": [
        63345638,
        -806808515
    ],
    "1705991400000": [
        63345638,
        67281766
    ],
    "1706184000000": [
        67281766
    ],
    "1706207400000": [
        63345638,
        -806808515
    ],
    "1706139000000": [
        -806808515
    ],
    "1706140800000": [
        -806808515
    ],
    "1706142600000": [
        -806808515
    ],
    "1706144400000": [
        -806808515
    ],
    "1706212800000": [
        -806808515
    ],
    "1706214600000": [
        -806808515
    ],
    "1706216400000": [
        -806808515
    ],
    "1706270400000": [
        -806808515
    ],
    "1706272200000": [
        -806808515
    ],
    "1706274000000": [
        -806808515
    ]
}

MEETING_LENGTH = 2
TIME_INCREMENT = 1800000
SCORE_SCALE = 0.1
STARTING_SCORES = {
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
}

def epochTimeToDate(epochTime, timezone):
    # Convert the epoch time to utc:
    datetime_object_utc = datetime.utcfromtimestamp(int(epochTime) / 1000)
    
    # Create the timezone from the string:
    target_timezone = pytz.timezone(timezone)
    
    # Extract the datetime in the target timezone:
    datetime_in_timezone = datetime_object_utc.replace(tzinfo=pytz.UTC).astimezone(target_timezone)
    
    # Format the date time:
    formatted_date = datetime_in_timezone.strftime('%Y-%m-%d')

    return formatted_date


def convertToDates(availability, timezone_str):
    dates = {}
    
    # Retrieve and sort the keys. Ensures that the dates and times are in order:
    keys = list(availability.keys())
    keys.sort()

    # Iterate across the keys in the availability dictionary:
    for key in keys:
        # Format the date:
        formatted_date = epochTimeToDate(key, timezone_str)

        # Add the timestamps to their respective date groupings:
        if formatted_date not in dates.keys():
            dates[formatted_date] = [key]
        else:
            dates[formatted_date].append(key)

    return dates;  

def identifyStartingBlocks(dates, day, availability):
    # Store a dictionary of users:
        users = set([])
        timeBlocks = []

        # Iterate across each time in a day:
        for time in dates[day]:
            # Extact the available users at a given time:
            availableUsers = availability[time]
            
            # Find which users are no longer in the time block and which users are now in the timeblock:
            usersToAdd = set(availableUsers).difference(users)
            usersToRemove = users.difference(availableUsers)

            # If new users are being added, mark the timeslot as a beginning timestamp:
            if (len(usersToAdd) > 0):
                timeBlocks.append(time)

            # Update the user set:
            users = users.union(usersToAdd).difference(usersToRemove)
        
        return timeBlocks

def findOptimalTime(availability, timezone_str, meetingLength):
    # Confirm meeting length validity:
    if meetingLength > 10 or meetingLength <= 0:
        return []

    dates = convertToDates(availability, timezone_str)

    # Retrieve the keys:
    keys = list(dates.keys())
    optimalTimes = {}
    
    # Iterate across each day:
    for key in keys:
        # Find the starting point for each day
        timeBlockStartingPoints = identifyStartingBlocks(dates, key, availability)
        optimalTime = ''
        optimalTimeScore = 0

        # For each starting time block:
        for time in timeBlockStartingPoints:
            userScores = {}
            timeScore = 0

            # iterate through the number of time slots matching meeting length:
            for i in range(0, meetingLength):
                # Compute the next time slot:
                newtime = str(int(time) + (i * TIME_INCREMENT))

                # If the timeslot exists in availability and is still within the same day:
                epochAsDate = epochTimeToDate(newtime, timezone_str)
                if newtime in availability and epochAsDate == key:
                    usersAvailableAtTime = availability[newtime]
                   
                   # compute user scores:
                    for user in usersAvailableAtTime:
                        # If it is their first time showing up we assign them a score based on the initial score mapping:
                        if user not in userScores:
                            userScores[user] = STARTING_SCORES[i]
                            timeScore = timeScore + userScores[user]
                        # Otherwise increase their score by the SCORE_SCALE
                        else:
                            scoreIncrease = userScores[user] * SCORE_SCALE
                            userScores[user] = userScores[user] + scoreIncrease
                            timeScore = timeScore + scoreIncrease
            
            # Check to see if this is the max time score:
            if (timeScore > optimalTimeScore):
                optimalTimeScore = timeScore
                optimalTime = time
        
        optimalTimes[key] = optimalTime
    
    return optimalTimes
            

optimalTime = findOptimalTime(availability, 'America/New_York', 2)
print(optimalTime)
