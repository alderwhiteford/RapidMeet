import SelectCell from "../components/Cell/SelectCell";

export function computeTimeIntervals(startTime, endTime) {
  let startHour = Number(startTime.split(":")[0])
  const startMeridiem = startTime.split(" ")[1]
  if (startMeridiem === 'am' && startHour === 12) {
    startHour = 0;
  }
  if (startMeridiem === 'pm') {
    startHour += 12
  }

  let endHour = Number(endTime.split(":")[0])
  const endMeridiem = endTime.split(" ")[1]
  if (endMeridiem === 'pm') {
    endHour += 12
  }

  // Compute Time Bar Times:
  const times = [];
  for (let i = startHour ; i <= endHour ; i++) {
    let time = i;
    let meridiem = 'AM';
    if (i > 12) {
      time = time - 12;
      meridiem = 'PM';
    }
    const timeString = `${time} ${meridiem}`
    times.push(timeString);
  }

  // Compute Epoch Times:
  const startEpochTime = 1000 * 60 * 60 * startHour // (milliseconds * seconds * minutes * hours)

  const timeIntervals = [startEpochTime];
  let lastInterval = startEpochTime;
  const numIntervals = ((endHour - startHour) * 2) - 1
  for (let i = 0 ; i < numIntervals ; i++) {
    let currentInterval = lastInterval + (1000 * 60 * 30) // (milliseconds * seconds * minutes)
    timeIntervals.push(currentInterval)
    lastInterval = currentInterval;
  }

  return [times, timeIntervals];
}

export function createScheduleRows(dates, intervals) {
  const scheduleRows = [];
  for (let i = 0 ; i < intervals.length ; i++) {
    const row = [];
    for (let j = 0 ; j < dates.length ; j++) {
      const epochTime = intervals[i] + dates[j];
      row.push(epochTime);
    }
    scheduleRows.push(row);
  }

  return scheduleRows;
}
