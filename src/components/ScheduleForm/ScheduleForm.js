import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

export default function ScheduleForm({ onSubmitHandler }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
        defaultValues: {
          schedule_name: '',
          start_time: '',
          end_time: '',
        }
      }
  );

  const SubmitButton = styled(Button)({
  height: '40px',
  backgroundColor: '#D3D3D3',
  boxShadow: 'none',
  textTransform: 'none',

  '&:hover': {
    backgroundColor: '#04a43c',
    boxShadow: 'none',
  },
  });

  const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column'
  })

  const StyledTextField = styled(TextField)({
  marginBottom: '15px',
  })

  return (
    <StyledForm onSubmit={handleSubmit(onSubmitHandler)}>
      <StyledTextField 
        error={!!errors.name}
        helperText={errors.name?.message ?? " "}
        InputLabelProps={{ shrink: true }}
        label="Schedule Name"
        {...register(
          'name',
          { required: "Please provide a name" }
        )}
        type="text"
        variant="outlined"
      />
      <StyledTextField 
        error={!!errors.start_time}
        helperText={errors.start_time?.message ?? " "}
        InputLabelProps={{ shrink: true }}
        label="Start Time"
        {...register(
          'start_time',
          { required: "Please provide a start time" }
        )}
        type="text"
        variant="outlined"
      />
      <StyledTextField 
        error={!!errors.end_time}
        helperText={errors.end_time?.message ?? " "}
        InputLabelProps={{ shrink: true }}
        label="End Time"
        {...register(
          'end_time',
          { required: "Please provide an end time" }
        )}
        type="text"
        variant="outlined"
      />
      <StyledTextField 
        error={!!errors.dates}
        helperText={errors.dates?.message ?? " "}
        InputLabelProps={{ shrink: true }}
        label="Dates"
        {...register(
          'text',
          { required: "Please provide at least one date" }
        )}
        type="date"
        variant="outlined"
      />
      <SubmitButton 
        variant="contained" 
        type="submit" 
      >
        Create Schedule
      </SubmitButton>
    </StyledForm>
  )
};
