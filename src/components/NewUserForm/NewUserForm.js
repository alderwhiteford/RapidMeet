import { Button, IconButton, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { setUser } from "../../redux/userSlice";
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

const StyledTextField = styled(TextField)({
  width: '70%',
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

export default function NewUserForm() {
  const dispatch = useDispatch();
  const { name, users } = useSelector((state) => state.schedule);
  const { scheduleId } = useParams();
  const [isNewUser, setIsNewUser] = useState(false);
  // const { email } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
        defaultValues: {
          name: '',
          email: '',
        }
      }
  );

  const addUser = (formData) => {
    addScheduleUser(scheduleId, formData.name, formData.email, users).then((res) => {
      if (res.success) {
        dispatch(setUser(res.data));
        dispatch(setModal('availability_calendar'));
      } else {
        dispatch(setErrorModal(res.error));
      }
    });
  };

  const checkUser = (formData) => {
    const user_id = stringToUniqueNumber(formData.name);
    if (users[user_id]) {
      const data = { id: user_id, name: users[user_id].user_name, email: users[user_id].user_email };
      console.log(data);
      dispatch(setUser(data));
      dispatch(setModal('returning_user'));
    } else {
      setIsNewUser(true);
      return;
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit(isNewUser ? addUser : checkUser)}>
        <StyledHeader>Welcome!</StyledHeader>
        <StyledSubHeader>Add your availability for {name}</StyledSubHeader>
        <StyledTextField
          error={!!errors.name}
          helperText={errors.name?.message ?? ' '}
          InputLabelProps={{ shrink: true }}
          label="Name"
          {...register('name', { required: "Please enter your name" })}
          placeholder="John Smith"
          type="text"
          variant="outlined"
        />
        {isNewUser && (
          <StyledTextField
            error={!!errors.email}
            helperText={errors.email?.message ?? ' '}
            InputLabelProps={{ shrink: true }}
            label="Email"
            {...register('email', { required: "Please enter your email" })}
            placeholder="name@email.com"
            type="text"
            variant="outlined"
          />
        )}
        <StyledButton
          type="submit"
          variant="contained"
          size="large"
        >
          Continue
        </StyledButton>
        <StyledIconButton onClick={() => dispatch(setModal())}>
          <CancelIcon sx={{ fontSize: 60 }}/>
        </StyledIconButton>
      </StyledForm>
    </FormContainer>
  );
};
