import React, { useEffect } from 'react';
import './App.css';

import VotePage from './components/VotePage/VotePage';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

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
            <Route path="/vote" element={<VotePage />} />
            <Route path="/teams" element={<Home />} />
            <Route path="/" element={<Auth />} />
          </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
