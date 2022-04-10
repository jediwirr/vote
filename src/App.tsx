import React, { useEffect, useState } from 'react';
import './App.css';

import VotePage from './components/VotePage/VotePage';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Main from './components/Main/Main';

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
            <Route path="/stats" element={<VotePage />} />
            <Route path="/vote" element={<Home voter={voter}/>} />
            <Route path="/auth" element={<Auth setVoter={setVoter}/>} />
            <Route path="/" element={<Main />} />
          </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
