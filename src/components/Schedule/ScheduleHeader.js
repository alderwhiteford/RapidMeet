import styled from "@emotion/styled";
import { IconButton, Typography } from "@mui/material";
import IosShareIcon from '@mui/icons-material/IosShare';
import { useDispatch } from "react-redux";
import { setSuccessModal } from "../../redux/generalSlice";

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
    marginRight: '-55px',
  },
});

const StyledIconShareButton = styled(IconButton)({
  display: 'none',

  '@media (max-width: 768px)': {
    display: 'inline',
  },
});

function ScheduleHeader({ name, attendees }) {
  const dispatch = useDispatch();

  const onClickShare = () => {
    navigator.clipboard.writeText(window.location.href);
    dispatch(setSuccessModal({ message: 'Successfully copied invite link to clipboard!' }));
  };

  return (
    <StyledContainer>
      <StyledNameContainer>
        <StyledTypography>{name}</StyledTypography>
        <span>
          <Typography sx={{ color: '#929191', fontSize: '12.5px', fontStyle: 'italic', display: 'inline' }}>All Times are in EST</Typography>
          <StyledIconShareButton onClick={onClickShare}>
            <IosShareIcon sx={{ fontSize: 22, color: 'black' }} />
          </StyledIconShareButton>
        </span>
      </StyledNameContainer>
      <StyledAttendeesContainer>
        <Typography sx={{ color: '#929191', fontSize: 12.5 }}>{attendees} {attendees === 1 ? 'Attendee' : 'Attendees'}</Typography>
      </StyledAttendeesContainer>
    </StyledContainer>
  )
};

export default ScheduleHeader;