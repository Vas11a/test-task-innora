import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RemovedTodosPage from './pages/RemovedTodosPage';

function App(): JSX.Element {
  
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/removed-todos" element={<RemovedTodosPage />} />
      </Routes>
    </div>
  );
}

export default App;
