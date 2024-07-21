import React, { useState, useEffect } from 'react';
import './App.css';
import Details from './Details';
import Sort from './Sort';
import PlayerList from './PlayerList'; // Uvezi PlayerList komponentu
import { fetchPlayers } from './playerService'; // Uvezi lokalne podatke

const App = () => {
  const [players, setPlayers] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const getPlayers = async () => {
      const playersData = await fetchPlayers(); // Učitaj podatke iz JSON datoteke
      setPlayers(playersData);
    };
    getPlayers();
  }, []);
    //Sort 
  const handleSort = (order) => {
    setSortOrder(order);
    const sortedPlayers = [...players].sort((a, b) => {
      if (order === 'asc') {
        return a.playerName.localeCompare(b.playerName);
      } else {
        return b.playerName.localeCompare(a.playerName);
      }
    });
    setPlayers(sortedPlayers);
  };
//onSelect
const handleSelectPlayer= (player)=>{
  setSelectedPlayer(player);
}

  return (
    <div className='main-container'>
      <div className='top-container'>
        <div className='left-container'>
          {selectedPlayer && <Details player={selectedPlayer} />}
        </div>
        <div className='right-container'>
          <Sort onSort={handleSort} />
        </div>
      </div>

      <div className='bottom-container'>
        <PlayerList players={players} onSelect={handleSelectPlayer} />
      </div>
    </div>
  );
};

export default App;
