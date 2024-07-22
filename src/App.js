import React, { useState, useEffect } from 'react';
import './App.css';
import Details from './Details'; // Uvoz komponente Details
import Sort from './Sort'; // Uvoz komponente Sort
import PlayerList from './PlayerList'; // Uvoz komponente PlayerList
import { fetchPlayers } from './playerService'; // Uvoz funkcije fetchPlayers za dohvaćanje podataka

const App = () => {
  const [players, setPlayers] = useState([]); // Stanje za podatke igrača, inicijalno prazno polje
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Stanje za odabranog igrača, inicijalno null

  //Dohvaćanje podataka
  useEffect(() => {
    // Hook useEffect koji se izvršava nakon prvog renderiranja komponente
    const getPlayers = async () => {
      // Asinkrona funkcija getPlayers za dohvaćanje podataka igrača
      try {
        const playersData = await fetchPlayers(); // Dohvaćanje podataka iz JSON datoteke pomoću fetchPlayers funkcije
        setPlayers(playersData); // Postavljanje dohvaćenih podataka u stanje players
      } catch (error) {
        console.error('Error fetching players:', error); // Ispis greške ako dođe do problema pri dohvaćanju podataka
      }
    };
    getPlayers(); // Poziv funkcije getPlayers za dohvaćanje podataka prilikom prvog renderiranja
  }, []); // Prazan niz oznaka za izvršavanje hooka useEffect samo jednom prilikom prvog renderiranja

  const handleSort = (order) => {
    // Funkcija handleSort za sortiranje igrača prema odabranom redoslijedu
    setPlayers(prevPlayers => {
      // Korištenje funkcionalnog pristupa setPlayers za osiguravanje pristupa prethodnom stanju
      return [...prevPlayers].sort((a, b) => {
        // Stvaranje kopije polja players i sortiranje kopije
        if (order === 'asc') {
          return a.realName.localeCompare(b.realName); // Sortiranje uzlazno prema realName svojstvu
        } else {
          return b.realName.localeCompare(a.realName); // Sortiranje silazno prema realName svojstvu
        }
      });
    });
  };
  
  

  const handleSelectPlayer = (player) => {
    // Funkcija handleSelectPlayer za odabir pojedinog igrača
    setSelectedPlayer(player); // Postavljanje odabranog igrača u stanje selectedPlayer
  };

  return (
    <div className='main-container'>
      {/* Glavni kontejner */}
      <div className='top-container'>
        {/* Kontejner za gornji dio stranice */}
        <div className='left-container'>
          {/* Details kontenjer */}
          {selectedPlayer && <Details player={selectedPlayer} />}
          {/* Renderiranje komponente Details ako postoji odabrani igrač */}
        </div>
        <div className='right-container'>
          {/* Control kontejner */}
          <Sort onSort={handleSort} />
          {/* Renderiranje komponente Sort i proslijeđivanje handleSort funkcije kao prop */}
        </div>
      </div>
      <div className='bottom-container'>
        {/* Overview kontenjer */}
        <PlayerList players={players} onSelect={handleSelectPlayer} />
        {/* Renderiranje komponente PlayerList i proslijeđivanje players i handleSelectPlayer funkcije kao propove */}
      </div>
    </div>
  );
};

export default App; // Izvoz glavne komponente App
