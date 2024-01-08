import styled from "@emotion/styled"
import { Typography } from "@mui/material";
import IosShareIcon from '@mui/icons-material/IosShare';

const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'auto',
  width: '100%',
  marginBottom: '5px',
});

const StyledScheduleName = styled(Typography)({
  fontSize: 20,
  justifySelf: 'flex-start',
});

const StyledAttendeesText = styled(Typography)({
  fontSize: 10,
  justifySelf: 'flex-end',
});

export function ScheduleHeader({ name, attendees }) {
  return (
    <StyledContainer>
      <StyledScheduleName>{name}</StyledScheduleName>
      <IosShareIcon />
      <StyledAttendeesText>{attendees} attendees</StyledAttendeesText>
    </StyledContainer>
  )
};