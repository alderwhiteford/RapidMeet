import { useEffect, useRef } from 'react';

import PageWrapper from '../components/PageWrapper/PageWrapper';
import { Alert, Grid, Snackbar, Typography } from '@mui/material';
import styled from '@emotion/styled';
import Typed from 'typed.js';

import ScheduleForm from '../components/ScheduleForm/ScheduleForm';
import { schedulePhrases } from "../utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import { setSuccessModal } from '../redux/generalSlice';

const CreateScheduleHeader = styled(Typography)({
  fontWeight: 600
});

const CreateScheduleSubHeader = styled(Typography)({
  fontWeight: 600,
  color: '#04a43c',
  marginBottom: '40px'
});

const StyledGrid = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  paddingRight: '8.5%',
  paddingLeft: '8.5%',
});

function CreateSchedule() {
  const dispatch = useDispatch();
  const typedTextRef = useRef(null);
  const { successModal } = useSelector((state) => state.general);

  useEffect(() => {
    const options = {
      strings: schedulePhrases,
      typeSpeed: 50,
      backSpeed: 25,
      startDelay: 1000,
      backDelay: 2000,
      loop: true,
      showCursor: true,
    };

    const typed = new Typed(typedTextRef.current, options);

    return () => {
      typed.destroy();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedulePhrases]);

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
      <PageWrapper>
        <StyledGrid item md={6} xs={12}>
          <CreateScheduleHeader variant="h3">
            Schedule a
          </CreateScheduleHeader>
          <CreateScheduleSubHeader variant="h3">
            <span ref={typedTextRef}></span>
          </CreateScheduleSubHeader>
          <ScheduleForm />
        </StyledGrid>
      </PageWrapper>
    </>
  )
};

export default CreateSchedule;