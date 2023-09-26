import { useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setSchedule } from '../redux/scheduleSlice';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';

function Schedule() {
  const navigate = useNavigate();
  const { name, start_time, end_time } = useSelector((state) => state.schedule);
  const { scheduleId } = useParams();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const docRef = doc(db, 'schedule', scheduleId);

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        dispatch(setSchedule(snapshot.data()));
      } else {
        // Todo: Set error state, redirect to 404 page or something
        navigate('/');
        return;
      }
    });

    return () => unsubscribe();
  }, [scheduleId, dispatch, navigate]);

  return (
      <div>
        {/**Todo: create separate components that split UI up, availability calendar, current schedule, etc*/}
         <h1>This is schedule {scheduleId}</h1>
         <p>This is schedule name: {name}</p>
         <p>Start time: {start_time}</p>
         <p>End time: {end_time}</p>
      </div>
  )
};

export default Schedule;