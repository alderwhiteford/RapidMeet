import { useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setSchedule } from '../redux/scheduleSlice';
import { db } from '../services/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import ScheduleMerged from '../components/Schedule/Schedule';
import Navbar from '../components/Navbar/Navbar';
import styled from '@emotion/styled';

function Schedule() {
  const navigate = useNavigate();
  const { name, start_time, end_time, dates } = useSelector((state) => state.schedule);
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

  const ScheduleContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '115px',
    paddingRight: '65px',
    alignItems: 'center'
  })

  return (
    <>
      <Navbar />
      <ScheduleContainer>
        {/**Todo: create separate components that split UI up, availability calendar, current schedule, etc*/}
        {/* <h1>This is schedule {scheduleId}</h1>
        <p>This is schedule name: {name}</p>
        <p>Start time: {start_time}</p>
        <p>End time: {end_time}</p> */}
        <ScheduleMerged 
          startTime={start_time}
          endTime={end_time}
          dates={dates}
        />
      </ScheduleContainer>
    </>
  )
};

export default Schedule;