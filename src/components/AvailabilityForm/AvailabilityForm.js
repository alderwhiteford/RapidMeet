import { Button, IconButton, TextField, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import { setErrorModal, setModal } from "../../redux/generalSlice";
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
  width: '60vw',
  height: '70vh',
  backgroundColor: 'white',
  borderRadius: '20px',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
});

const StyledHeader = styled(Typography)({
  alignSelf: 'flex-center',
  color: '#04a43c',
  fontSize: 40,
  fontWeight: 700,
});

const StyledButton = styled(Button)({
  backgroundColor: '#04a43c',
  '&:hover': {
    backgroundColor: '#037e33',
  },
  width: '30%',
});

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  top: -30,
  right: -30,
  zIndex: 101,
  color: '#D3D3D3',
});

export default function AvailabilityForm({ startTime, endTime, dates, setTimes, selectedTimes }) {
  const dispatch = useDispatch();
  const { availability, name, users } = useSelector((state) => state.schedule);
  const { user } = useSelector((state) => state);
  const { scheduleId } = useParams();

  console.log(user);

  const addAvailability = () => {
    updateUserAvailability(scheduleId, user, selectedTimes, availability, users).then((res) => {
      if (res.success) {
        dispatch(setModal());
      } else {
        dispatch(setErrorModal(res.error));
      }
    })
  }

  return (
    <FormContainer>
      <StyledForm>
        <StyledHeader>Your availability for {name}</StyledHeader>
        <ScheduleGrid startTime={startTime} endTime={endTime} dates={dates} setTimes={setTimes} />
        <StyledButton
          variant="contained"
          size="large"
          onClick={addAvailability}
        >
          Save
        </StyledButton>
        <StyledIconButton onClick={() => dispatch(setModal())}>
          <CancelIcon sx={{ fontSize: 60 }}/>
        </StyledIconButton>
      </StyledForm>
    </FormContainer>
  );
};