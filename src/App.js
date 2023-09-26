import { Route, Routes } from 'react-router-dom';
import CreateSchedule from './views/CreateSchedule';
import Schedule from './views/Schedule';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";  


function App() {
  return (
    <PrimeReactProvider>
      <Routes>
        <Route path="/" element={<CreateSchedule />} />
        <Route path="/:scheduleId" element={<Schedule />} />
      </Routes>
    </PrimeReactProvider>
  );
}

export default App;
