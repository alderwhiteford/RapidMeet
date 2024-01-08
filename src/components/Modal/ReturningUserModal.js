import { Button, IconButton, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { resetUser, setUser } from "../../redux/userSlice";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import { setErrorModal, setModal } from "../../redux/generalSlice";
import { addScheduleUser, getUserByName } from "../../services/scheduleApi";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { stringToUniqueNumber } from "../../utils/strings";

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

const StyledForm = styled('form')({
  position: 'relative',
  width: '25vw',
  height: '50vh',
  paddingTop: '40px',
  backgroundColor: 'white',
  borderRadius: '20px',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '10px',
});

const StyledHeader = styled(Typography)({
  alignSelf: 'flex-start',
  marginLeft: '15%',
  marginBottom: '-5%',
  color: '#04a43c',
  fontSize: 40,
  fontWeight: 700,
});

const StyledSubHeader = styled(Typography)({
  alignSelf: 'flex-start',
  marginLeft: '15%',
  marginBottom: '5%',
  fontSize: 20,
});

const StyledText = styled(Typography)({
  alignSelf: 'flex-start',
  fontSize: 15,
  flexWrap: 'wrap',
})

const StyledButton = styled(Button)({
  backgroundColor: '#04a43c',
  '&:hover': {
    backgroundColor: '#037e33',
  },
  width: '70%',
});

const StyledButtonContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  top: -30,
  right: -30,
  zIndex: 101,
  color: '#D3D3D3',
});

export default function ReturningUserModal() {
  const dispatch = useDispatch();
  const { name, users } = useSelector((state) => state.schedule);
  const { scheduleId } = useParams();
  const [isNewUser, setIsNewUser] = useState(false);
  const { email } = useSelector((state) => state.user);

  const handleCancel = () => {
    dispatch(resetUser())
    dispatch(setModal('new_user_form'))
  };

  const handleContinue = () => dispatch(setModal('availability_calendar'));

  return (
    <FormContainer>
      <StyledForm>
        <StyledHeader>Edit Your</StyledHeader>
        <StyledSubHeader>availability for {name}</StyledSubHeader>
        <StyledText>The name you have provided is in use. Do you wish to continue as {email}</StyledText>
        <StyledButtonContainer>
          <StyledButton
            variant="contained"
            size="large"
            onClick={handleCancel}
          >
            Cancel
          </StyledButton>
          <StyledButton
            variant="contained"
            size="large"
            onClick={handleContinue}
          >
            Continue
          </StyledButton>
        </StyledButtonContainer>
        <StyledIconButton onClick={() => dispatch(setModal())}>
          <CancelIcon sx={{ fontSize: 60 }}/>
        </StyledIconButton>
      </StyledForm>
    </FormContainer>
  );
};