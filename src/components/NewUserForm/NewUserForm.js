import { useEffect } from "react";
import { Alert, Button, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { setUser } from "../../redux/userSlice";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import { setModal } from "../../redux/generalSlice";
import { addScheduleUser } from "../../services/scheduleApi";
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

const StyledForm = styled('form')(
  ({ isNewUser }) => ({
    position: 'relative',
    width: '400px',
    height: isNewUser ? '450px' : '375px',
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
      height: isNewUser ? '450px' : '350px',
      padding: '10px',
    },
  })
);

const StyledHeader = styled(Typography)({
  alignSelf: 'flex-start',
  marginLeft: '25px',
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
  marginLeft: '25px',
  marginBottom: '5%',
  fontSize: 20,

  '@media (max-width: 768px)': {
    fontSize: 20,
  },
});

const StyledTextField = styled(TextField)({
  width: '85%',
});

const StyledEmailField = styled(StyledTextField)(({ show }) => ({
  transition: 'max-height 0.5s, opacity 0.5s',
  maxHeight: show ? '100px' : '0',
  opacity: show ? 1 : 0,
}));

const StyledButton = styled(Button)({
  backgroundColor: '#04a43c',
  '&:hover': {
    backgroundColor: '#037e33',
  },
  width: '85%',
});

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  top: -30,
  right: -30,
  zIndex: 101,
  color: '#D3D3D3',
});

const StyledSnackbar = styled(Snackbar)({
  zIndex: 101,
});

const StyledCancelIcon = styled(CancelIcon)({
  backgroundColor: 'white',
  color: '#929191',
  fontSize: 60,
  borderRadius: '50%',
});

export default function NewUserForm() {
  const dispatch = useDispatch();
  const { name, users } = useSelector((state) => state.schedule);
  const { scheduleId } = useParams();
  const [isNewUser, setIsNewUser] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState([false, null]);

  let schema = yup.object({
    name: yup.string().required("Please enter your name"),
  });

  if (isNewUser) {
    schema = schema.shape({
      email: yup.string().email("Invalid email format, please use name@email.com format.").required("Please enter your email"),
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
      mode: 'onSubmit',
      resolver: yupResolver(schema),
      defaultValues: {
        name: '',
        email: '',
      }
    }
  );

  useEffect(() => {
    reset({}, { keepValues: true });
  }, [isNewUser, reset]);

  const addUser = (formData) => {
    addScheduleUser(scheduleId, formData.name, formData.email, users).then((res) => {
      if (res.success) {
        dispatch(setUser(res.data));
        dispatch(setModal('availability_calendar'));
      } else {
        setErrorSnackbar([true, res.error]);
      }
    });
  };

  const checkUser = (formData) => {
    const user_id = stringToUniqueNumber(formData.name);
    if (users[user_id]) {
      const data = { id: user_id, name: users[user_id].user_name, email: users[user_id].user_email };
      dispatch(setUser(data));
      dispatch(setModal('returning_user'));
    } else {
      setIsNewUser(true);
      return;
    }
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
        <StyledForm isNewUser={isNewUser} onSubmit={handleSubmit(isNewUser ? addUser : checkUser)}>
          <StyledHeader>Welcome!</StyledHeader>
          <StyledSubHeader>Add your availability for {name}</StyledSubHeader>
          <StyledTextField
            error={!!errors.name}
            helperText={errors.name?.message ?? ' '}
            label="Name"
            {...register('name', { required: "Please enter your name" })}
            placeholder="John Smith"
            type="text"
            variant="outlined"
          />
          <StyledEmailField
            show={isNewUser}
            error={!!errors.email}
            helperText={errors.email?.message ?? ' '}
            label="Email"
            {...register('email', { required: "Please enter your email" })}
            placeholder="name@email.com"
            type="email"
            variant="outlined"
          />
          <StyledButton
            type="submit"
            variant="contained"
            size="large"
            sx={{ textTransform: 'none' }}
          >
            Continue
          </StyledButton>
          <StyledIconButton onClick={() => dispatch(setModal())}>
            <StyledCancelIcon />
          </StyledIconButton>
        </StyledForm>
      </FormContainer>
    </>
  );
};
