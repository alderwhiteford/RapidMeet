import { Button, IconButton, Typography } from "@mui/material";
import { resetUser } from "../../redux/userSlice";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import { setModal } from "../../redux/generalSlice";

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
  width: '20vw',
  height: '35vh',
  padding: '40px',
  backgroundColor: 'white',
  borderRadius: '20px',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '10px',

  '@media (max-width: 768px)': {
    width: '75vw',
    height: '30vh',
    padding: '25px',
  },
});

const StyledHeader = styled(Typography)({
  alignSelf: 'flex-start',
  marginBottom: '-5%',
  color: '#04a43c',
  fontSize: 40,
  fontWeight: 700,

  '@media (max-width: 768px)': {
    fontSize: 35,
  },
});

const StyledSubHeader = styled(Typography)({
  alignSelf: 'flex-start',
  marginBottom: '5%',
  fontSize: 20,
});

const StyledText = styled(Typography)({
  alignSelf: 'flex-start',
  fontSize: 15,
  flexWrap: 'wrap',
});

const StyledEmailText = styled(Typography)({
  color: '#04a43c',
  display: 'inline',
});

const StyledButtonContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '60px',

  '@media (max-width: 768px)': {
    gap: '40px',
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#04a43c',
  '&:hover': {
    backgroundColor: '#037e33',
  },
  width: '70%',
});

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  top: -30,
  right: -30,
  zIndex: 101,
  color: '#D3D3D3',
});

const StyledCancelIcon = styled(CancelIcon)({
  backgroundColor: 'white',
  color: '#929191',
  fontSize: 60,
  borderRadius: '50%',
});

export default function ReturningUserModal() {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.schedule);
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
        <StyledText>The name you have provided is in use. Do you wish to continue as <StyledEmailText>{email}</StyledEmailText>?</StyledText>
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
          <StyledCancelIcon />
        </StyledIconButton>
      </StyledForm>
    </FormContainer>
  );
};