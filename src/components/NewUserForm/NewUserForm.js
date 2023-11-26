import { Button, IconButton, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { setUser } from "../../redux/userSlice";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { Cancel } from "@mui/icons-material";
import { setModalOpen } from "../../redux/generalSlice";

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
  height: '50vh',
  backgroundColor: 'white',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledButton = styled(Button)({
  backgroundColor: '#04a43c',
  '&:hover': {
    backgroundColor: '#037e33',
  },
});

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  top: -20,
  right: -20,
});

export default function NewUserForm({ modalOpen = false }) {
  const dispatch = useDispatch();

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
    dispatch(setUser(formData));
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit(addUser)}>
        <TextField
          error={!!errors.name}
          helperText={errors.name?.message ?? ' '}
          InputLabelProps={{ shrink: true }}
          label="Name"
          {...register('name', { required: "Please enter your name" })}
          type="text"
          variant="outlined"
        />
        <TextField
          error={!!errors.email}
          helperText={errors.email?.message ?? ' '}
          InputLabelProps={{ shrink: true }}
          label="Email"
          {...register('email', { required: "Please enter your email" })}
          type="text"
          variant="outlined"
        />
        <StyledButton
          type="submit"
          variant="contained"
          size="large"
        >
          Continue
        </StyledButton>
        <StyledIconButton onClick={() => dispatch(setModalOpen(false))}>
          <Cancel />
        </StyledIconButton>
      </StyledForm>
    </FormContainer>
  );
};
