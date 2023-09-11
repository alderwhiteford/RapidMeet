import { useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getScheduleById } from '../services/scheduleApi';
import { setSchedule } from '../redux/scheduleSlice';

function Schedule() {
  const navigate = useNavigate();
  const { schedule } = useSelector((state) => state);
  const { scheduleId } = useParams();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    getScheduleById(scheduleId)
      .then((res) => {
        if (!res.success) {
          navigate('/');
          return
        }
        dispatch(setSchedule(res.data.data));
      })
  }, [scheduleId, navigate, dispatch]);

  return (
      <div>
        {/**Todo: create separate components that split UI up, availability calendar, current schedule, etc*/}
         <h1>This is schedule {scheduleId}</h1>
         <p>This is schedule name: {schedule?.name}</p>
         <p>Start time: {schedule?.start_time}</p>
         <p>End time: {schedule?.end_time}</p>
      </div>
  )
};

export default Schedule;