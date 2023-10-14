import React from 'react';
import styled from '@emotion/styled';
import Cell from './Cell';
import { parse, addMinutes } from 'date-fns';

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: auto repeat(${props => props.numColumns}, 1fr);
`;

const TimeLabelsColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px; /* Add some padding to separate time labels from cells */
`;

const TimeLabel = styled.div`
  height: 40px; /* Adjust the height as needed */
  display: flex;
  align-items: center;
`;

const CalendarColumn = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
`;

const CalendarRow = styled.div`
  border: 1px solid #ccc;
  height: 40px; /* Adjust the height as needed */
`;

function Calendar({ schedule }) {
  if (!schedule) {
    return <div>Loading...</div>;
    // Temporary fallback, we can have some error handling here
  }

  const numColumns = schedule.dates.length;

  const startTime = parse(schedule.start_time, 'h:mm a', new Date());
  const endTime = parse(schedule.end_time, 'h:mm a', new Date());

  const timeLabelsAndRows = [];
  let currentTime = startTime;

  while (currentTime < endTime) {
    const timeLabel = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    timeLabelsAndRows.push(timeLabel);
    currentTime = addMinutes(currentTime, 30);
  }

  return (
    <CalendarContainer numColumns={numColumns + 1}>
      <TimeLabelsColumn>
        {timeLabelsAndRows.map((timeLabel, index) => (
          <TimeLabel key={index}>{timeLabel}</TimeLabel>
        ))}
      </TimeLabelsColumn>
      {schedule.dates.map((date, index) => (
        <CalendarColumn key={index}>
          {date}
          {timeLabelsAndRows.map((_, timeIndex) => (
            <CalendarRow key={timeIndex}>
              <Cell />
            </CalendarRow>
          ))}
        </CalendarColumn>
      ))}
    </CalendarContainer>
  );
}

export default Calendar;
