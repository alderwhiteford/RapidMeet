import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setSchedule } from '../redux/scheduleSlice';
import { setModal } from '../redux/generalSlice';
import { db } from '../services/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import ScheduleGrid from '../components/Schedule/Schedule';
import Navbar from '../components/Navbar/Navbar';
import NewUserForm from '../components/NewUserForm/NewUserForm';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import AvailabilityForm from '../components/AvailabilityForm/AvailabilityForm';
import ErrorModal from '../components/Modal/ErrorModal';

function Schedule() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTimes, setSelectedTimes] = useState(new Set());

  const { errorModal, modal } = useSelector((state) => state.general);
  const { name, start_time, end_time, dates } = useSelector((state) => state.schedule);
  const { user } = useSelector((state) => state);
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
          {errorModal.isOpen && (
            <ErrorModal />
          )}
          <ScheduleGrid startTime={start_time} endTime={end_time} dates={dates} display/>
          {user.id ?
            <Button onClick={() => dispatch(setModal('availability_calendar'))}>Edit Availability</Button>
            :
            <Button onClick={() => dispatch(setModal('new_user_form'))}>Add Availability</Button>
          }
          {modal === 'new_user_form' && (
            <NewUserForm />
          )}
          {modal === 'availability_calendar' && (
            <AvailabilityForm startTime={start_time} endTime={end_time} dates={dates} setTimes={setSelectedTimes} selectedTimes={selectedTimes} />
          )}
          {user &&
            <p>Hi {user.name}</p> // User is not being correctly set right in redux from NewUserForm for some reason...
          }
        </ScheduleContainer>
      </>
  )
};

export default Schedule;