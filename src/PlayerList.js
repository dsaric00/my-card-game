import React, { useState, useEffect } from 'react';
import { fetchPlayers } from './playerService'; // Uvezi funkciju fetchPlayers
import 'bootstrap/dist/css/bootstrap.min.css';



//Komponenta 
const PlayerList = ({ onSelect}) => {
  // state varijable 'players' i funkcije 'setPlayers' prazan niz za ažuriranje stanja 
  const [players, setPlayers] = useState([]);
// useEffect hook za dohvaćanje podataka kada se komponenta montira 
  useEffect(() => {
    // Asinkrona funkcija za dovaćanje podataka 
    const getPlayers = async () => {
      try {
        const playersData = await fetchPlayers(); // Pozovi fetchPlayers funkciju
        setPlayers(playersData); // Postavi dobivene igrače u stanje komponente
      } catch (error) {
        console.error('Error fetching players:', error); //ispis greške u konzolu u slučaju errora 
      }
    };

    getPlayers(); // Pozovi funkciju za dohvat igrača kada se komponenta montira
  }, []);// Prazan niz kao drugi argument, useEffect će se pokrenuti samo jednom nakon što se komponenta montira 
  //Renderiranje JSX-a
  return (
    <div>
    <h2>Overview</h2>
    <div className="card-flex">
      {players.map((player) => {
        return (
          <div className="card" key={player.id} onClick={() => onSelect(player)} >
            {player.playerName}
          </div>
        );
      })}
    </div>
  </div>
  );
};
// izvoz komponente kako bi se mogla koristit
export default PlayerList;
