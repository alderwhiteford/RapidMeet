import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { computeTimeIntervals, createScheduleRows } from "../../utils/scheduleGrid";
import { days, months } from "../../utils/constants";
import HeaderCell from "../HeaderCell/HeaderCell";
import { useState } from "react";
import SelectCell from "../Cell/SelectCell";

export default function ScheduleGrid({ startTime, endTime, dates }) {
  const intervals = computeTimeIntervals(startTime, endTime);
  const rows = createScheduleRows(dates, intervals)
  const [isMouseDown, setIsMouseDown] = useState(false);

  return (
    <TableContainer 
      component={Paper} 
      sx={{width: '30vw', marginLeft: '50px'}}
      onMouseDownCapture={() => setIsMouseDown(true)}
      onMouseUpCapture={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
    >
      <Table>
        <TableHead>
          <TableRow>
            {dates.map((date, index) => {
              const JSDate = new Date(date);
              return (
                <HeaderCell 
                  day={days[JSDate.getDay()]} 
                  date={`${months[JSDate.getMonth()]} ${JSDate.getDate()}`}
                  lastCol={index === dates.length - 1}
                />
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              {row.map((cell) => (
                <SelectCell epochTime={cell} isMouseDown={isMouseDown}/>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}