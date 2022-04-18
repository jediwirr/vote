import React, { useEffect, useState } from 'react';
import './App.css';

import VotePage from './components/VotePage/VotePage';
import KidHome from './components/Home/KidHome';
import Main from './components/Main/Main';
import ParentAuth from './components/Auth/ParentAuth';
import KidAuth from './components/Auth/KidAuth';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { IParent, IVoter } from './types/types';
import ParentHome from './components/Home/ParentHome';


function App() {

  const [voter, setVoter] = useState({} as IVoter)
  const [parent, setParent] = useState({} as IParent)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/stats" element={<VotePage />} />
            <Route path="/parentVote" element={<ParentHome parent={parent}/>} />
            <Route path="/kidVote" element={<KidHome voter={voter}/>} />
            <Route path="/kidAuth" element={<KidAuth setVoter={setVoter}/>} />
            <Route path="/parentAuth" element={<ParentAuth setParent={setParent}/>} />
            <Route path="/" element={<Main />} />
          </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
