import { useSelector } from "react-redux";
import { computeTimeIntervals, createScheduleRows } from "../../utils/scheduleGrid";
import { useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from "@mui/material";
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
    <Paper sx={{
      minWidth: '50vw',
      maxWidth: '80vw',
      maxHeight: '65vh',
      overflow: 'scroll',
      boxShadow: '5px 5px 5px #C1C1C1',
      display: 'flex',
      paddingBottom: '25px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '100px',
      }}>
        {rows.map((row, index) =>
          <TimeCell 
            time={index === rows.length - 1 
              ? sideBarTimes[sideBarTimes.length - 1] 
              : index % 2 === 0 
                ? sideBarTimes[index / 2] 
                : undefined}
            lastCell={index === rows.length - 1}
          />
        )}
      </div>
      <TableContainer 
        component={Paper} 
        sx={{
          display: 'flex',
          boxShadow: 'none',
          height: '100%',
        }}
        {...(!display ? { 
            onMouseDownCapture: () => setIsMouseDown(true), 
            onMouseUpCapture: () => setIsMouseDown(false),
            onMouseLeave: () => setIsMouseDown(false)
          } : {})
        }
      >
        <Table sx={{boxShadow: '5px 5px'}}>
          <TableHead>
              <TableRow sx={{ height: '100px', zIndex: 4}}>
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
    </Paper>
  )
}