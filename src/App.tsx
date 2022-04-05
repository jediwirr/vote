import React, { useEffect, useState } from 'react';
import './App.css';

import VotePage from './components/VotePage/VotePage';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { IVoter } from './types/types';

function App() {

  const [voter, setVoter] = useState({} as IVoter)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/vote" element={<VotePage />} />
            <Route path="/teams" element={<Home voter={voter}/>} />
            <Route path="/" element={<Auth setVoter={setVoter}/>} />
          </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
