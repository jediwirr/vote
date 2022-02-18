import React, { useEffect } from 'react';
import './App.css';

import VotePage from './components/VotePage/VotePage';
// import Home from './components/Home/Home';

function App() {
  // const dispacth = useAppDispatch();
  // const { teams, isLoading, error } = useAppSelector(state => state.teamReducer);

  // useEffect(() => {
  //   dispacth(fetchTeams());
  // }, []);

  return (
    <div className="App">
      {/* <Home /> */}
      <VotePage />
    </div>
  );
}

export default App;
