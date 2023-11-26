import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setMouseDown, setSchedule } from '../redux/scheduleSlice';
import { db } from '../services/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import ScheduleGrid from '../components/Schedule/Schedule';
import Navbar from '../components/Navbar/Navbar';
import { Button } from '@mui/material';
import NewUserForm from '../components/NewUserForm/NewUserForm';
import { setModalOpen } from '../redux/generalSlice';

function Schedule() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modalOpen } = useSelector((state) => state.general);
  const { name, start_time, end_time, dates } = useSelector((state) => state.schedule);
  const { user } = useSelector((state) => state.user);
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

  return (
      <div>
        {user &&
          <p>Hi {user.name}, {user.email}</p>
        }
        <Navbar />
        <ScheduleGrid startTime={start_time} endTime={end_time} dates={dates}/>
        <Button onClick={() => dispatch(setModalOpen(true))}>Add Availability</Button>
        {modalOpen && (
          <NewUserForm />
        )}
      </div>
  )
};

export default Schedule;