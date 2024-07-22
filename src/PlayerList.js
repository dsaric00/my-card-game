import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlayerList = ({ players, onSelect }) => {
  // state varijable 'players' i funkcije 'setPlayers' prazan niz za ažuriranje stanja 
  const [localPlayers, setLocalPlayers] = useState(players);
// ažurira se kada se plaayers promijeni npr asc ili desc redosljed
  useEffect(() => {
    setLocalPlayers(players);
  }, [players]);

  return (
    <div>
      <h2>Overview</h2>
      <div className="card-flex">
        {localPlayers.map((player) => {
          return (
            <div className="card" key={player.id} onClick={() => onSelect(player)}>
              <p>{player.realName}</p>
              <p>{player.playerName}</p>
              <p>{player.asset}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// izvoz komponente kako bi se mogla koristit
export default PlayerList;

