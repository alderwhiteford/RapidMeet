import { Route, Routes } from 'react-router-dom';
import CreateSchedule from './views/CreateSchedule';
import Schedule from './views/Schedule';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path="/" element={<CreateSchedule />} />
        <Route path="/:scheduleId" element={<Schedule />} />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
