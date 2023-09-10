import { useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getScheduleById } from '../services/scheduleApi';

function Schedule() {
  // Get selected schedule from state
  const navigate = useNavigate();
  const { scheduleId } = useParams();

  // Placeholder variable
  let selectedSchedule;
  useLayoutEffect(() => {
    getScheduleById(scheduleId)
      .then((res) => {
        if (!res.success)
          navigate('/');
        // setSelectedSchedule(res.data);
        console.log(res);
        selectedSchedule = res.data.data;
      })
  }, [scheduleId, navigate]);

  return (
      <div>
        {/**Display schedule stuff here, also we split this jsx into sections where we can import a form for the user
         * to enter their availability and stuff and then a section for viewing the schedule
         */}
         <h1>This is schedule {scheduleId}</h1>
         <p>Start time: {selectedSchedule.start_time}</p>
         <p>End time: {selectedSchedule.end_time}</p>
      </div>
  )
};

export default Schedule;