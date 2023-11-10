import { useSelector } from "react-redux";
import { computeTimeIntervals, createScheduleRows } from "../../utils/scheduleGrid";
import { useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import SelectCell from "../Cell/SelectCell";
import HeaderCell from "../HeaderCell/HeaderCell";
import TimeCell from "../Cell/TimeCell";
import DisplayCell from "../Cell/DisplayCell";
import { days, months } from "../../utils/constants";

export default function ScheduleMerged({ startTime, endTime, dates, display }) {
  const { availability, users } = useSelector((state) => state.schedule);
  const [sideBarTimes, intervals] = computeTimeIntervals(startTime, endTime);
  const rows = createScheduleRows(dates, intervals)
  const [isMouseDown, setIsMouseDown] = useState(false);

  return (
    <TableContainer 
      component={Paper} 
      sx={{
        display: 'flex',
        width: '50vw',
        height: '75vh',
        borderRadius: '0 20px 0 0',
        overFlow: 'scroll',
        marginLeft: '200px',
        boxShadow: 'none'
      }}
      {...(!display ? { 
          onMouseDownCapture: () => setIsMouseDown(true), 
          onMouseUpCapture: () => setIsMouseDown(false),
          onMouseLeave: () => setIsMouseDown(false)
        } : {})
      }
    >
      <Table>
        <TableHead>
          <TableRow sx={{ height: '100px'}}>
            <TableCell sx={{ border: 0, minWidth: '70px', width: '70px' }}/>
            {dates.map((date, index) => {
              const JSDate = new Date(date);
              return (
                <HeaderCell
                  day={days[JSDate.getDay()]} 
                  date={`${months[JSDate.getMonth()]} ${JSDate.getDate()}`}
                  firstHeader={index === 0}
                />
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody sx={{position: 'relative'}}>
          {rows.map((row, index) => (
              <TableRow>
                <TimeCell 
                  time={index === rows.length - 1 
                    ? sideBarTimes[sideBarTimes.length - 1] 
                    : index % 2 === 0 
                      ? sideBarTimes[index / 2] 
                      : undefined}
                  lastCell={index === rows.length - 1}
                />
                {row.map((cell) => (
                  display ?
                    <DisplayCell
                      users={users}
                      availability={availability[cell]}
                      epochTime={cell}
                      isHour={index % 2 === 1}
                    /> : 
                    <SelectCell
                      epochTime={cell}
                      isMouseDown={isMouseDown}
                      isHour={index % 2 === 1}
                    />
                ))}
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}