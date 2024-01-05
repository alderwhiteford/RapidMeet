import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorModal } from "../../redux/generalSlice";
import { Typography } from "@mui/material";

const Container = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  zIndex: 99,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledErrorModal = styled('div')({
  position: 'relative',
  width: '25vw',
  height: '50vh',
  backgroundColor: 'white',
  borderRadius: '20px',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledErrorMessage = styled(Typography)({
  alignSelf: 'flex-center',
  color: 'red',
  fontSize: 40,
  fontWeight: 700,
});

export default function ErrorModal() {
  const dispatch = useDispatch();

  const { errorModal } = useSelector((state) => state.general);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setErrorModal()); // Close modal automatically after 5 seconds
    }, 5000);
  }, [])

  return (
    <Container>
      <StyledErrorModal>
        <StyledErrorMessage>{errorModal.message}</StyledErrorMessage>
        {/* Can add close button as well here */}
      </StyledErrorModal>
    </Container>
  )
}