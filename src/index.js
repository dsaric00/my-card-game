// Importovanje CSS-a za stilizaciju komponente
import './App.css';

// Uvoz React i potrebnih hookova i komponenti
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client'; // Može biti skraćeno kao 'import ReactDOM from 'react-dom';
import Details from "./Details"; // Uvoz komponente za prikaz detalja igrača
import Sort from "./Sort"; // Uvoz komponente za sortiranje igrača
import PlayerList from "./PlayerList"; // Uvoz komponente za prikaz liste igrača
import { fetchPlayers } from "./playerService"; // Uvoz funkcije za dohvaćanje igrača

// Glavna komponenta aplikacije
const RealName = () => {
  // Stanja komponente
  const [players, setPlayers] = useState([]); // Stanje za igrače
  const [sortOrder ,setSortOrder] = useState('asc'); // Stanje za redoslijed sortiranja (asc ili desc)
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Stanje za odabranog igrača

  // useEffect hook za dohvaćanje igrača kada se komponenta montira
  useEffect(() => {
    const getPlayers = async () => {
      try {
        // Dohvati podatke o igračima koristeći funkciju fetchPlayers
        const data = await fetchPlayers();
        // Postavi dohvaćene igrače u stanje players
        setPlayers(data);
      } catch (error) {
        // U slučaju greške pri dohvatanju, prikaži grešku u konzoli
        console.error('Error fetching players:', error);
      }
    };
    // Pozovi funkciju za dohvaćanje igrača kada se komponenta montira
    getPlayers();
  }, []); // Prazan niz ovdje označava da će se useEffect izvršiti samo jednom pri montiranju komponente

  // Funkcija za sortiranje igrača
  const handleSort = (order) => {
    // Postavi redoslijed sortiranja u stanje
    setSortOrder(order);
    // Kopiraj postojeći niz igrača radi sigurnosti (immutable pristup)
    const sortedPlayers = [...players].sort((a, b) => {
      if (order === 'asc') {
        return a.realName.localeCompare(b.realName); // Sortiranje po abecedi uzlazno
      } else {
        return b.realName.localeCompare(a.realName); // Sortiranje po abecedi silazno
      }
    });
    // Postavi sortirane igrače u stanje players
    setPlayers(sortedPlayers);
  };

  // Funkcija za odabir igrača
  const handleSelectPlayer = (player) => {
    // Postavi odabranog igrača u stanje selectedPlayer
    setSelectedPlayer(player);
  };

  // Renderovanje komponente
  return (
    <div className='main-container'>
      <div className='top-container'>
        <div className='left-container'>
          {/* Prikazi detalje odabranog igrača ako postoji */}
          {selectedPlayer && <Details player={selectedPlayer} />}
        </div>
        <div className='right-container'>
          {/* Prikazi komponentu za sortiranje i proslijedi joj funkciju za sortiranje */}
          <Sort onSort={handleSort} />
        </div>
      </div>

      <div className='bottom-container'>
        {/* Prikazi listu igrača i proslijedi joj listu igrača i funkciju za odabir */}
        <PlayerList players={players} onSelect={handleSelectPlayer} />
      </div>
    </div>
  );
};

// Kreiraj root element i renderuj glavnu komponentu aplikacije RealName
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RealName />);
