import { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setSchedule } from '../redux/scheduleSlice';
import { db } from '../services/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import Navbar from '../components/Navbar/Navbar';
import styled from '@emotion/styled';
import ScheduleGrid from '../components/Schedule/Schedule';
import { Button, Typography } from '@mui/material';
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

const ScheduleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '115px',
  paddingRight: '65px',
  alignItems: 'center'
})


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

  return (
    <>
      <Navbar />
      <PageColumnContainer>
        <FlexColumn>
          <OptimizerContainer>
            <StyledHeader>
              Need to add / edit your availability?
            </StyledHeader>
            <StyledAvailabilityButton>
              Add your availability
            </StyledAvailabilityButton>
            <OptimizerForm />
            <StyledScheduleButtonContainer>
              <StyledScheduleButton
                sx={{
                  borderColor: '#00A63C !important',
                  border: 1,
                  color: '#00A63C'
                }}
                onClick={() => navigator.clipboard.writeText(window.location.href)}
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
          />
        </FlexColumn>
      </PageColumnContainer>
    </>
  )
};

export default Schedule;