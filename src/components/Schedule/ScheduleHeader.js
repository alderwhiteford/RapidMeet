import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  minWidth: '40vw',
  maxWidth: '80%',
  marginBottom: '10px',

  '@media (max-width: 768px)': {
    minWidth: '60vw',
  },
});

const StyledTypography = styled(Typography)({
  color: '#929191',
  fontSize: 20,

  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const StyledNameContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginRight: 'auto',
  marginLeft: '55px',

  '@media (max-width: 768px)': {
    marginLeft: '0',
  },
});

const StyledAttendeesContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',

  '@media (max-width: 768px)': {
    display: 'none',
  },
});

function ScheduleHeader({ name, attendees }) {
  return (
    <StyledContainer>
      <StyledNameContainer>
        <StyledTypography>{name}</StyledTypography>
        <Typography sx={{ color: '#929191', fontSize: '12.5px', fontStyle: 'italic'}}>All Times are in EST</Typography>
      </StyledNameContainer>
      <StyledAttendeesContainer>
        <Typography sx={{ color: '#929191', fontSize: 12 }}>{attendees} {attendees === 1 ? 'Attendee' : 'Attendees'}</Typography>
      </StyledAttendeesContainer>
    </StyledContainer>
  )
};

export default ScheduleHeader;