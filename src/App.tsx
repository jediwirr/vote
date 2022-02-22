import React, { useEffect } from 'react';
import './App.css';

import VotePage from './components/VotePage/VotePage';
import Home from './components/Home/Home';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<VotePage />} />
            <Route path="/teams" element={<Home />} />
          </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
