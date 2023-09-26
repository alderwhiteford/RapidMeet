import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import DatePicker from '../DatePicker/DatePicker';
import { Button, InputLabel, FormControl, FormHelperText, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { createSchedule } from '../../services/scheduleApi';
import { timeOptions } from '../../utils/constants';

export default function ScheduleForm() {
  const [startTime, setStartTime] = useState('Select start time');
  const [endTime, setEndTime] = useState('Select end time');

  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
        defaultValues: {
          schedule_name: '',
        }
      }
  );

  const handleCreateSchedule = ({ schedule_name, dates }) => {
    const epochDates = dates.map((date) => date.getTime())
    
    createSchedule({
      name: schedule_name,
      start_time: startTime,
      end_time: endTime,
      dates: epochDates
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
      .then((res) => {
        navigate(`/${res.data.id}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
    flexDirection: 'column',
  });

  return (
    <StyledForm onSubmit={handleSubmit(handleCreateSchedule)}>
      <StyledTextField
        error={!!errors.schedule_name}
        helperText={errors.schedule_name?.message ?? ' '}
        InputLabelProps={{ shrink: true }}
        label="Schedule Name"
        {...register('name', { required: "Please provide a name" })}
        type="text"
        variant="outlined"
      />
      <Controller
        name='dates'
        control={control}
        defaultValue={[]}
        render={({ ref, ...field }) => (
          <DatePicker ref={ref} { ...field }/>
        )}
      />
      <FormControl variant="outlined" style={{ marginBottom: '15px' }}>
        <InputLabel>Start Time</InputLabel>
        <Controller
          name="start_time"
          control={control}
          defaultValue=""
          rules={{ required: 'Please provide a start time' }}
          render={({ field }) => (
            <Select
              {...field}
              label="Start Time"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                field.onChange(e);
              }}
            >
              {timeOptions.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText error={!!errors.start_time}>
          {errors.start_time?.message}
        </FormHelperText>
      </FormControl>

      <FormControl variant="outlined" style={{ marginBottom: '15px' }}>
        <InputLabel>End Time</InputLabel>
        <Controller
          name="end_time"
          control={control}
          defaultValue=""
          rules={{ required: 'Please provide an end time' }}
          render={({ field }) => (
            <Select
              {...field}
              label="End Time"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
                field.onChange(e);
              }}
              disabled={startTime === 'Select start time'}
            >
              {timeOptions
                .slice(startTime ? timeOptions.indexOf(startTime) + 1 : 0)
                .map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
            </Select>
          )}
        />
        <FormHelperText error={!!errors.end_time}>
          {errors.end_time?.message}
        </FormHelperText>
      </FormControl>
      <SubmitButton
        variant="contained"
        type="submit"
      >
        Create Schedule
      </SubmitButton>
    </StyledForm>
  )
};
