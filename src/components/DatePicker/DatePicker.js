import { Button } from '@mui/material';
import { Calendar } from 'primereact/calendar';
import './DatePicker.css'
import React, { useState } from 'react';
import styled from '@emotion/styled';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function DatePicker({ field, datesSelected, setDatesSelected, setAnimationComplete }) {
  const { value, onChange } = field
  const [open, setOpen] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (value.length > 0) {
      setDatesSelected(true)
    } else {
      setAnimationComplete(false);
      setDatesSelected(false)
    }
    setOpen(false);
  }

  const today = new Date();

  const StyledButton = styled(Button)({
    color: 'white',
    width: '100%',
    height: '40px',
    boxShadow: 'none',
    textTransform: 'none',
    marginBottom: '40px',
    backgroundColor: datesSelected ? '#04a43c' : '#97c9a5',
    transition: '0.2s ease',
  
    '&:hover': {
      backgroundColor: '#04a43c !important',
      boxShadow: 'none',
      transition: '0.2s ease'
    },
  });

  return (
    <>
      <StyledButton 
        onClick={handleOpen} 
        startIcon={datesSelected ? <ModeEditIcon /> : <CalendarTodayIcon />}
      >
        {datesSelected ? `Edit Dates - ${value.length} selected!` : "Select Dates"}
      </StyledButton>
      { open &&
      <div className='date-picker-modal'>
        <Calendar 
          minDate={today} 
          value={value}
          onChange={ (e) => onChange(e.value) }
          selectionMode="multiple"
          readOnlyInput
          inline
          style={{ marginBottom: '40px' }}
        />
        <StyledButton 
          sx={{ width: '225px !important' }} 
          onClick={handleClose}
        >
          Save Selection
        </StyledButton>
      </div>
      }
    </>
  )
}
