import styled from "@emotion/styled";
import { Grid, Hidden, Typography } from "@mui/material";
import BackgroundImage from "../../assets/background.png"
import Logo from "../../assets/logo.jpeg"

const StyledGridContainer = styled(Grid)({
  height: '100vh',
})

const StyledGridItem = styled(Grid)({
  backgroundImage: `url(${BackgroundImage})`,
  objectFit: 'cover',
  display: 'flex',
  flexDirection: 'column',
  color: 'white',
  justifyContent: 'center',
  alignItems: 'center',
})

const StyledLogo = styled('img')({
  width: '60%',
  minWidth: '400px',
  alignSelf: 'center',
})

const StyledTypography = styled(Typography)({
  width: '60%',
  minWidth: '400px',
  textAlign: 'center',
  fontSize: '22px',
  marginTop: '20px',
  fontWeight: 200
})

export default function PageWrapper({ children }) {
  return (
    <StyledGridContainer container>
      { children }
      <Hidden mdDown>
        <StyledGridItem item xs={6}>
          <StyledLogo src={ Logo }/>
          <StyledTypography>
            A platform for simplifying team scheduling, helping you effortlessly find the perfect meeting times.
          </StyledTypography>
        </StyledGridItem>
      </Hidden>
    </StyledGridContainer>
  );
}