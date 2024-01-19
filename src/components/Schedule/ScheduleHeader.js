import styled from "@emotion/styled";
import { IconButton, Typography } from "@mui/material";
import IosShareIcon from '@mui/icons-material/IosShare';
import InfoIcon from '@mui/icons-material/Info';

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

function ScheduleHeader({ name, attendees, onClickShare }) {
  return (
    <StyledContainer>
      <StyledNameContainer>
        <Typography sx={{ color: '#505050', fontSize: 20 }}>{name}</Typography>
        <IconButton onClick={onClickShare}>
          <IosShareIcon sx={{ color: 'black' }} />
        </IconButton>
      </StyledNameContainer>
      <StyledAttendeesContainer>
        <Typography sx={{ color: '#929191', fontSize: 12 }}>{attendees} {attendees === 1 ? 'Attendee' : 'Attendees'}</Typography>
      </StyledAttendeesContainer>
    </StyledContainer>
  )
};

export default ScheduleHeader;