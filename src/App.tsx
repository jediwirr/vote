import React from 'react';
import './App.css';

import Chart from './components/Chart/Chart';
import TeamsList from './components/TeamsList/TeamsList';
import VotePage from './components/VotePage/VotePage';
// import Home from './components/Home/Home';
import { teams } from "./data/teams";
import TeamIcon from './components/TeamIcon/TeamIcon';
import Counter from './components/Counter';

function App() {

  return (
    <div className="App">
      <Counter />
      {/* <Home /> */}
      {/* <VotePage>
        <TeamsList
          items={teams}
          renderItems={item =>
            <TeamIcon key={item.name} team={item} voted={0} />
          }
        />
        <Chart />
      </VotePage> */}
    </div>
  );
}

export default App;
