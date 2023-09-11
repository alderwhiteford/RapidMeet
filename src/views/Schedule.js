import { useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getScheduleById } from '../services/scheduleApi';
import { setSchedule } from '../redux/scheduleSlice';

function Schedule() {
  const navigate = useNavigate();
  const { schedule } = useSelector((state) => state.schedule);
  const { scheduleId } = useParams();

  useLayoutEffect(() => {
    getScheduleById(scheduleId)
      .then((res) => {
        if (!res.success)
          navigate('/');
        setSchedule(res.data.data);
      })
  }, [scheduleId, navigate]);

  return (
      <div>
        {/**Todo: create separate components that split UI up, availability calendar, current schedule, etc*/}
         <h1>This is schedule {scheduleId}</h1>
         <p>Start time: {schedule?.start_time}</p>
         <p>End time: {schedule?.end_time}</p>
      </div>
  )
};

export default Schedule;