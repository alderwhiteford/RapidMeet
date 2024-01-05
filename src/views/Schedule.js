import { useLayoutEffect, useState } from 'react';
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
  const dispatch = useDispatch();

  const [selectedTimes, setSelectedTimes] = useState(new Set());

  const { name, start_time, end_time, dates } = useSelector((state) => state.schedule);
  const { scheduleId } = useParams();

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
         <ScheduleGrid startTime={start_time} endTime={end_time} dates={dates} setTimes={setSelectedTimes}/>
      </ScheduleContainer>
    </>
  )
};

export default Schedule;