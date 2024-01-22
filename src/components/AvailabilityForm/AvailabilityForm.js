import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, IconButton, Snackbar, Typography } from "@mui/material";
import styled from "@emotion/styled";
import CancelIcon from "@mui/icons-material/Cancel";
import InfoIcon from '@mui/icons-material/Info';
import { setModal, setSuccessModal } from "../../redux/generalSlice";
import { updateUserAvailability } from "../../services/scheduleApi";
import { useParams } from "react-router-dom";
import ScheduleGrid from "../Schedule/Schedule";

const FormContainer = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  zIndex: 99,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledForm = styled('div')({
  position: 'relative',
  width: '800px',
  height: '650px',
  backgroundColor: 'white',
  borderRadius: '20px',
  padding: '5px',
  paddingBottom: '20px',
  paddingTop: '20px',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  '@media (max-width: 1280px)': {
    width: '85vw',
    height: '85vh',
  },

  '@media (max-width: 768px)': {
    width: '95vw',
  },
});

const StyledHeader = styled(Typography)({
  alignSelf: 'center',
  color: '#04a43c',
  fontSize: 28,
  textAlign: 'center',

  '@media (max-width: 1280px)': {
    fontSize: 25,
  },

  '@media (max-width: 768px)': {
    marginLeft: '0px',
    fontSize: 25,
  },
});

const StyledHeaderBlack = styled(Typography)({
  color: 'black',
  display: 'inline',
  fontSize: 28,

  '@media (max-width: 1280px)': {
    fontSize: 25,
  },

  '@media (max-width: 768px)': {
    fontSize: 25,
  },
});

const StyledInfoContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '5px',
});

const StyledSubText = styled(Typography)({
  color: '#929191',
  fontSize: 15,

  '@media (max-width: 768px)': {
    fontSize: 10,
    marginRight: '0px',
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#04a43c',
  '&:hover': {
    backgroundColor: '#97c9a5',
  },
  width: '30%',
  marginTop: '20px',

  '@media (max-width: 768px)': {
    width: '60%',
  },
});

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  top: -30,
  right: -30,
  zIndex: 101,
  color: '#D3D3D3',

  '@media (max-width: 768px)': {
    top: -20,
    right: -20,
  },
});

const StyledSnackbar = styled(Snackbar)({
  zIndex: 101,
});

const StyledCancelIcon = styled(CancelIcon)({
  backgroundColor: 'white',
  color: '#929191',
  fontSize: 60,
  borderRadius: '50%',

  '@media (max-width: 768px)': {
    fontSize: 40,
  },
});

const StyledInfoIcon = styled(InfoIcon)({
  color: '#929191',
  fontSize: 20,

  '@media (max-width: 768px)': {
    fontSize: 10,
  },
})

export default function AvailabilityForm({ startTime, endTime, dates, setTimes, selectedTimes, setDeletedTimes, deletedTimes }) {
  const dispatch = useDispatch();
  const { availability, name, users } = useSelector((state) => state.schedule);
  const { user } = useSelector((state) => state);
  const { scheduleId } = useParams();
  const [errorSnackbar, setErrorSnackbar] = useState([false, null]);

  const addAvailability = () => {
    updateUserAvailability(scheduleId, user, selectedTimes, availability, users, deletedTimes).then((res) => {
      if (res.success) {
        dispatch(setModal());
        dispatch(setSuccessModal({ message: 'Successfully added availability to calendar' }));
      } else {
        setErrorSnackbar([true, res.error]);
      }
    });
  };

  const handleSnackbarClose = () => {
    setErrorSnackbar([false, null]);
  };

  return (
    <>
      <StyledSnackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
        open={errorSnackbar[0]} 
        autoHideDuration={4000} 
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {errorSnackbar[1]}
        </Alert>
      </StyledSnackbar>
      <FormContainer>
        <StyledForm>
          <StyledHeader>Your <StyledHeaderBlack>availability for {name}</StyledHeaderBlack></StyledHeader>
          <StyledInfoContainer>
            <StyledInfoIcon sx={{ color: '#929191', marginRight: '5px' }}/>
            <StyledSubText>Click and drag time blocks on the calendar to add your availability</StyledSubText>
          </StyledInfoContainer>
          <ScheduleGrid 
            startTime={startTime}
            endTime={endTime}
            dates={dates}
            setTimes={setTimes}
            setDeletedTimes={setDeletedTimes}
          />
          <StyledButton
            variant="contained"
            size="large"
            onClick={addAvailability}
            sx={{ textTransform: 'none' }}
          >
            Save
          </StyledButton>
          <StyledIconButton onClick={() => dispatch(setModal())}>
            <StyledCancelIcon />
          </StyledIconButton>
        </StyledForm>
      </FormContainer>
    </>
  );
};