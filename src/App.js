import { Route, Routes } from 'react-router-dom';
import CreateSchedule from './views/CreateSchedule';
import Schedule from './views/Schedule';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateSchedule />} />
      <Route path="/:scheduleId" element={<Schedule />} />
    </Routes>
  );
}

export default App;
