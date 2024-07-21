import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const Sort = ({onSort}) => {
  const [order, setOrder] = useState(''); // Stanje za redoslijed sortiranja, početno postavljeno na 'desc'

  // Funkcija za promjenu redoslijeda sortiranja
  const handleSort1 = (selectedOrder) => {
    setOrder(selectedOrder); // Postavi odabrani redoslijed sortiranja na kliknuti order ('asc' ili 'desc')
  
  };

  // Funkcija za podnošenje forme
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting order: ', order); // Ispis trenutnog redoslijeda prilikom podnošenja forme
    onSort(order); // Pozovi funkciju za sortiranje s trenutnim redoslijedom kao argumentom
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <h1>Control</h1> {/* Naslov forme */}
      <div className="ml-2">
        <button
          className={"btn btn-primary"} // Klasa 'selected' dodana ako je redoslijed 'asc'
          type="button"
          onClick={() => handleSort1('asc')} // Postavi redoslijed na 'asc' prilikom klikanja na gumb
        >
          Ascending
        </button>
        <button
          className={`btn btn-primary ${order === 'desc' ? 'selected' : ''}`} // Klasa 'selected' dodana ako je redoslijed 'desc'
          type="button"
          onClick={() => handleSort1('desc')} // Postavi redoslijed na 'desc' prilikom klikanja na gumb
        >
          Descending
        </button>
      </div>
      <button className="submit btn btn-success" type="submit">
        Submit
      </button> {/* Gumb za podnošenje forme */}
    </form>
  );
};

export default Sort;

