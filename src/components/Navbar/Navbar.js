import styled from "@emotion/styled";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  backgroundColor: 'white',
  padding: '20px',
});

const StyledButton = styled(Button)({
  backgroundColor: '#04a43c',
  '&:hover': {
    backgroundColor: '#037e33',
  },
});

const StyledTypograpgy = styled(Typography)({
  color: '#04a43c',
  flexGrow: 1,
  
  '@media (max-width: 768px)': {
    fontSize: 25,
    marginRight: '0px',
  },
});

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, position: 'fixed', zIndex: 2, width: '100vw' }}>
      <AppBar position="static">
        <StyledToolbar>
          {/* Logo will go here, also we will prob want to find a nice font to use for the typography */}
          <StyledTypograpgy variant="h4" component="div">
            RapidMeet
          </StyledTypograpgy>
          <StyledButton
            variant="contained"
            size="large"
            endIcon={<CalendarMonthIcon />}
            onClick={() => navigate('/')}
            sx={{ textTransform: 'none' }}
          >
            Create
          </StyledButton>
        </StyledToolbar>
      </AppBar>
    </Box>
  )
};
