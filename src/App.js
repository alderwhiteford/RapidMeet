import { Route, Routes } from 'react-router-dom';
import CreateSchedule from './views/CreateSchedule';
import Schedule from './views/Schedule';
import PageNotFound from './views/PageNotFound';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";  


function App() {
  return (
    <PrimeReactProvider>
      <Routes>
        <Route path="/" element={<CreateSchedule />} />
        <Route path="/:scheduleId" element={<Schedule />} />
        <Route path="/page-not-found" element={<PageNotFound />} />
      </Routes>
    </PrimeReactProvider>
  );
}

export default App;
