import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  minWidth: '40vw',
  maxWidth: '80%',

  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const StyledNameContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 'auto',
  marginLeft: '55px',
});

const StyledAttendeesContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto',
});

function ScheduleHeader({ name, attendees }) {
  return (
    <StyledContainer>
      <StyledNameContainer>
        <Typography sx={{ color: '#929191', fontSize: 20 }}>{name}</Typography>
      </StyledNameContainer>
      <StyledAttendeesContainer>
        <Typography sx={{ color: '#929191', fontSize: 12 }}>{attendees} {attendees === 1 ? 'Attendee' : 'Attendees'}</Typography>
      </StyledAttendeesContainer>
    </StyledContainer>
  )
};

export default ScheduleHeader;