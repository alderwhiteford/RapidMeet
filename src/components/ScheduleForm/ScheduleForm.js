import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react'
import DatePicker from '../DatePicker/DatePicker';
import { Alert, Button, InputLabel, FormControl, FormHelperText, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { createSchedule } from '../../services/scheduleApi';
import { timeOptions } from '../../utils/constants';
import { setSchedule } from '../../redux/scheduleSlice';
import { useDispatch } from 'react-redux';

export default function ScheduleForm() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [datesSelected, setDatesSelected] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState([false, null]);

  const dispatch = useDispatch();
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

  const handleCreateSchedule = ({ event_name, dates }) => {
    const epochDates = dates.map((date) => {
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date.getTime()
    })
    
    // Put the dates in order if selected out of order:
    epochDates.sort();
    
    createSchedule({
      name: event_name,
      start_time: startTime,
      end_time: endTime,
      dates: epochDates,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
      .then((res) => {
        if (res.success) {
          navigate(`/${res.data.id}`);
          dispatch(setSchedule(res.data));
        } else {
          setErrorSnackbar([true, res.error]);
        }
      });
  };

  const slideDown = keyframes`
    to {
      transform: translateY(0);
    }
  `

  const SubmitButton = styled(Button)({
    position: 'relative',
    transform: animationComplete ? 'translateY(0)' : 'translateY(-13.5em)',
    animation: !animationComplete && datesSelected ? `${slideDown} 0.4s ease-in-out forwards` : '',
    height: '40px',
    backgroundColor: datesSelected && endTime !== '' ? '#97c9a5' : '#D3D3D3',
    boxShadow: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: '#04a43c',
      boxShadow: 'none',
    },
  });

  const StyledFormControl = styled(FormControl)({
    opacity: animationComplete ? 1 : 0,
  })

  const StyledForm = styled('form')({
    display: 'flex',
    flexDirection: 'column'
  })

  const StyledTextField = styled(TextField)({
    marginBottom: '15px',
    flexDirection: 'column',
  });

  return (
    <>
      <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
        open={errorSnackbar[0]} 
        autoHideDuration={4000} 
        onClose={() => setErrorSnackbar([false, null])}
      >
        <Alert onClose={() => setErrorSnackbar([false, null])} severity="error" sx={{ width: '100%' }}>
          {errorSnackbar[1]}
        </Alert>
      </Snackbar>
      <StyledForm onSubmit={handleSubmit(handleCreateSchedule)}>
        <StyledTextField
          error={!!errors.event_name}
          helperText={errors.event_name?.message ?? ' '}
          label="Event Name"
          {...register('event_name', { required: "Please provide a name for the event" })}
          type="text"
          variant="outlined"
        />
        <Controller
          name='dates'
          control={control}
          defaultValue={[]}
          render={({ ref, ...field }) => (
            <DatePicker 
              ref={ref} { ...field } 
              datesSelected={datesSelected} 
              setDatesSelected={setDatesSelected} 
              setAnimationComplete={setAnimationComplete}
            />
          )}
        />
        <Typography sx={{ marginBottom: '10px', fontSize: '12.5px', fontStyle: 'italic', color: '#929191' }}>All Times are in EST</Typography>
        <StyledFormControl variant="outlined" style={{ marginBottom: '15px' }} error={!!errors.start_time}>
          <InputLabel>Start Time</InputLabel>
          <Controller
            name="start_time"
            control={control}
            defaultValue=''
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
                disabled={!datesSelected}
              >
                {timeOptions.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>
            {errors.start_time?.message || ' '}
          </FormHelperText>
        </StyledFormControl>

        <StyledFormControl variant="outlined" style={{ marginBottom: '15px' }} error={!!errors.end_time}>
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
                disabled={startTime === ''}
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
          <FormHelperText>
            {errors.end_time?.message || ' '}
          </FormHelperText>
        </StyledFormControl>
        <SubmitButton
          variant="contained"
          type="submit"
          onAnimationEnd={() => setAnimationComplete(true) }
        >
          Create Schedule
        </SubmitButton>
      </StyledForm>
    </>
  )
};
