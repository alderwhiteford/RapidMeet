import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SadKitty from "../assets/sad-kitty.png";

const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '50px',
  gap: '30px',
});

const StyledLink = styled(Link)({
  color: '#00A63C',
  fontSize: 20,
});

const StyledKitty = styled('img')({
  width: '30%',
  minWidth: '200px',
})

function PageNotFound() {
  return (
    <StyledContainer>
      <span>
        <Typography sx={{ color: '#00A63C', fontSize: 35, display: 'inline' }}>Oops! </Typography>
        <Typography sx={{ fontSize: 35, display: 'inline' }}>Looks like this schedule doesn't exist or was recently closed.</Typography>
      </span>
      <StyledKitty src={SadKitty} />
      <StyledLink to="/">Go Back Home</StyledLink>
    </StyledContainer>
  )
};

export default PageNotFound;