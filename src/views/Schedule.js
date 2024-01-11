import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setSchedule } from '../redux/scheduleSlice';
import { setModal, setSuccessModal } from '../redux/generalSlice';
import { db } from '../services/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import ScheduleGrid from '../components/Schedule/Schedule';
import Navbar from '../components/Navbar/Navbar';
import NewUserForm from '../components/NewUserForm/NewUserForm';
import styled from '@emotion/styled';
import { Alert, Button, Snackbar } from '@mui/material';
import AvailabilityForm from '../components/AvailabilityForm/AvailabilityForm';
import ReturningUserModal from '../components/Modal/ReturningUserModal';

const ScheduleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '115px',
  paddingRight: '65px',
  alignItems: 'center'
});

const StyledButton = styled(Button)({
  backgroundColor: '#04a43c',
  marginTop: '20px',
  width: '30vw',
  '&:hover': {
    backgroundColor: '#04a43c',
  },
});

function Schedule() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTimes, setSelectedTimes] = useState(new Set());

  const { successModal, modal } = useSelector((state) => state.general);
  const { start_time, end_time, dates } = useSelector((state) => state.schedule);
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

  return (
      <>
        <Snackbar 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
          open={successModal?.isOpen} 
          autoHideDuration={4000} 
          onClose={() => dispatch(setSuccessModal())}
        >
          <Alert onClose={() => dispatch(setSuccessModal())} severity="success" sx={{ width: '100%' }}>
            {successModal?.message}
          </Alert>
        </Snackbar>
        <Navbar />
        <ScheduleContainer>
          <ScheduleGrid startTime={start_time} endTime={end_time} dates={dates} display/>
          {user.id ?
            <StyledButton variant="contained" onClick={() => dispatch(setModal('availability_calendar'))}>Edit Availability</StyledButton>
            :
            <StyledButton variant="contained" onClick={() => dispatch(setModal('new_user_form'))}>Add Availability</StyledButton>
          }
          {modal === 'new_user_form' && (
            <NewUserForm />
          )}
          {modal === 'returning_user' && (
            <ReturningUserModal />
          )}
          {modal === 'availability_calendar' && (
            <AvailabilityForm startTime={start_time} endTime={end_time} dates={dates} setTimes={setSelectedTimes} selectedTimes={selectedTimes} />
          )}
        </ScheduleContainer>
      </>
  )
};

export default Schedule;