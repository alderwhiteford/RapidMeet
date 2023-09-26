import PageWrapper from '../components/PageWrapper/PageWrapper';
import { Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';
import ScheduleForm from '../components/ScheduleForm/ScheduleForm';

function CreateSchedule() {
  const CreateScheduleHeader = styled(Typography)({
    fontWeight: 600
  });

  const CreateScheduleSubHeader = styled(Typography)({
    fontWeight: 600,
    color: '#04a43c',
    marginBottom: '40px'
  });

  const StyledGrid = styled(Grid)({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingRight: '8.5%',
    paddingLeft: '8.5%',
  })

  return (
    <>
      <PageWrapper>
        <StyledGrid item md={6} xs={12}>
          <CreateScheduleHeader variant="h3">
            Create a
          </CreateScheduleHeader>
          <CreateScheduleSubHeader variant="h3">
            Group Schedule
          </CreateScheduleSubHeader>
          <ScheduleForm />
        </StyledGrid>
      </PageWrapper>
    </>
  )
};

export default CreateSchedule;