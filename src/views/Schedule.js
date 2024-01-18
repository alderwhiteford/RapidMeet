import { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setSchedule } from '../redux/scheduleSlice';
import { setModal, setSuccessModal } from '../redux/generalSlice';
import { db } from '../services/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import Navbar from '../components/Navbar/Navbar';
import NewUserForm from '../components/NewUserForm/NewUserForm';
import styled from '@emotion/styled';
import { Alert, Button, Snackbar, Typography } from '@mui/material';
import AvailabilityForm from '../components/AvailabilityForm/AvailabilityForm';
import ReturningUserModal from '../components/Modal/ReturningUserModal';
import ScheduleGrid from '../components/Schedule/Schedule';
import OptimizerForm from '../components/OptmizerForm/OptimizerForm';

const PageColumnContainer = styled.div({
  maxWidth: '100vw',
  display: 'flex',
  flexDirection: 'row',

  '@media (max-width: 768px)': {
    flexDirection: 'column'
  }
})

const FlexColumn = styled.div({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  paddingTop: '82.25px',

  '@media (max-width: 768px)': {
    width: '100%'
  }
})

const OptimizerContainer = styled.div({
  width: '75%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  '@media (max-width: 768px)': {
    marginTop: '30px'
  },
})

const StyledHeader = styled(Typography)({
  fontSize: '25px',
  color: '#505050',
})

const StyledAvailabilityButton = styled(Button)({
  width: '100%',
  backgroundColor: '#00A63C',
  marginTop: '12.5px',
  textTransform: 'none',
  color: 'white',
  padding: '10px',

  '&:hover': {
    backgroundColor: '#97c9a5'
  }
})

const StyledScheduleButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '15px',
  marginTop: '45px'
});

const StyledScheduleButton = styled(Button)({
  flex: 1,
  textTransform: 'none',
  padding: '10px',
});

function Schedule() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTimes, setSelectedTimes] = useState(new Set());
  const [deletedTimes, setDeletedTimes] = useState(new Set());

  const { successModal, modal } = useSelector((state) => state.general);
  const { start_time, end_time, dates, name } = useSelector((state) => state.schedule);
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

  const onClickShare = () => {
    navigator.clipboard.writeText(window.location.href);
    dispatch(setSuccessModal({ message: 'Successfully copied invite link to clipboard!' }));
  };

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
      {modal === 'new_user_form' && (
        <NewUserForm />
      )}
      {modal === 'returning_user' && (
        <ReturningUserModal />
      )}
      {modal === 'availability_calendar' && (
        <AvailabilityForm 
          startTime={start_time}
          endTime={end_time}
          dates={dates}
          setTimes={setSelectedTimes}
          setDeletedTimes={setDeletedTimes}
          deletedTimes={deletedTimes}
          selectedTimes={selectedTimes}
        />
      )}
      <Navbar />
      <PageColumnContainer>
        <FlexColumn>
          <OptimizerContainer>
            <StyledHeader>
              Need to add / edit your availability?
            </StyledHeader>
            {user.id ?
              <StyledAvailabilityButton onClick={() => dispatch(setModal('availability_calendar'))}>
                Edit your availability
              </StyledAvailabilityButton> 
              :
              <StyledAvailabilityButton onClick={() => dispatch(setModal('new_user_form'))}>
                Add your availability
              </StyledAvailabilityButton> 
            }
            <OptimizerForm />
            <StyledScheduleButtonContainer>
              <StyledScheduleButton
                sx={{
                  borderColor: '#00A63C !important',
                  border: 1,
                  color: '#00A63C'
                }}
                onClick={onClickShare}
              >
                Share Event
              </StyledScheduleButton>
              <StyledScheduleButton
                sx={{
                  borderColor: '#DE4402 !important',
                  border: 1,
                  color: '#DE4402'
                }}
              >
                Close Event
              </StyledScheduleButton>
            </StyledScheduleButtonContainer>
          </OptimizerContainer>
        </FlexColumn>
        <FlexColumn>
          <ScheduleGrid 
            startTime={start_time}
            endTime={end_time}
            dates={dates}
            setTimes={setSelectedTimes}
            title={name}
            display
          />
        </FlexColumn>
      </PageColumnContainer>
    </>
  )
};

export default Schedule;