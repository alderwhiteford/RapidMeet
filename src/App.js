import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>Welcome to the App</>} />
        <Route path="/hello" element={<>Hello</>} />
        <Route path="/world" element={<>World</>} />
      </Routes>
      <div className="App">
      </div>
    </>
  );
}

export default App;
