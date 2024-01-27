import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { computeTimeIntervals, createScheduleRows } from "../../utils/scheduleGrid";
import { days, months } from "../../utils/constants";
import { useSelector } from "react-redux";
import { useState } from "react";
import SelectCell from "../Cell/SelectCell";
import HeaderCell from "../HeaderCell/HeaderCell";
import TimeCell from "../Cell/TimeCell";
import DisplayCell from "../Cell/DisplayCell";

export default function ScheduleGrid({ startTime, endTime, dates, display, setTimes, setDeletedTimes, title }) {
  const { availability, users, optimalTimes, timezone } = useSelector((state) => state.schedule);
  const [sideBarTimes, intervals] = computeTimeIntervals(startTime, endTime, timezone);
  const rows = createScheduleRows(dates, intervals)
  const [isMouseDown, setIsMouseDown] = useState(false);
  const { id, name, email } = useSelector((state) => state.user);
  const user = { id: id, name: name, email: email };

  return (
    <Paper 
      sx={{
        minWidth: '40vw',
        maxWidth: '80%',
        maxHeight: '80%',
        overflow: 'scroll',
        boxShadow: '5px 5px 5px #e8e8e8',
        display: 'flex',
        paddingBottom: '25px',

        '@media (max-width: 768px)': {
          minWidth: '90vw',
          maxHeight: '60vh'
        },
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '80.5px',
      }}>
        {rows.map((row, index) =>
          <TimeCell
            key={index} 
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
          overflow: 'visible',
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
              <TableRow sx={{ height: '80px', zIndex: 4}}>
                {dates.map((date, index) => {
                  const JSDate = new Date(date);
                  return (
                    <HeaderCell
                      key={index}
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
                <TableRow sx={{ height: '18.5px' }}>
                  {row.map((cell) => (
                    display ? (
                      <DisplayCell
                        key={index}
                        users={users}
                        availability={availability[cell]}
                        epochTime={cell}
                        isHour={index % 2 === 1}
                        isOptimal={optimalTimes.includes(cell)}
                      />) : (
                      <SelectCell
                        key={index}
                        epochTime={cell}
                        isMouseDown={isMouseDown}
                        isHour={index % 2 === 1}
                        setTime={setTimes}
                        setDeletedTime={setDeletedTimes}
                        selectedState={availability[cell]?.includes(user.id)}
                      />
                    )
                  ))}
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}