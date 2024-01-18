import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { computeTimeIntervals, createScheduleRows } from "../../utils/scheduleGrid";
import { days, months } from "../../utils/constants";
import { useSelector } from "react-redux";
import { useState } from "react";
import SelectCell from "../Cell/SelectCell";
import HeaderCell from "../HeaderCell/HeaderCell";
import TimeCell from "../Cell/TimeCell";
import DisplayCell from "../Cell/DisplayCell";

export default function ScheduleGrid({ startTime, endTime, dates, display, setTimes, setDeletedTimes, title }) {
  const { availability, users } = useSelector((state) => state.schedule);
  const [sideBarTimes, intervals] = computeTimeIntervals(startTime, endTime);
  const rows = createScheduleRows(dates, intervals)
  const [isMouseDown, setIsMouseDown] = useState(false);
  const { user } = useSelector((state) => state);

  return (
    <Paper 
      sx={{
        maxWidth: '80%',
        maxHeight: '80vh',
        overflow: 'scroll',
        boxShadow: '5px 5px 5px #e8e8e8',
        display: 'flex',
        paddingBottom: '25px'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '80.5px',
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
          overflow: 'visible'
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
              <TableRow sx={{ height: '80px', zIndex: 4}}>
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
                        setTime={setTimes}
                        setDeletedTime={setDeletedTimes}
                        selectedState={availability[cell]?.includes(user.id)}
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