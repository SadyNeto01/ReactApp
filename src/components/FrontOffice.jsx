import React, { useState, useEffect } from 'react';
import { getBooks } from '../Api';
import BookCard from './BookCard';

const FrontOffice = () => {
  const [trips, setTrips] = useState([]);
  const [ratings, setRatings] = useState({}); 


  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getBooks();
        if (Array.isArray(data)) {
          setTrips(data); 
        } else {
          console.error('Os dados retornados não são uma lista válida:', data);
        }
      } catch (error) {
        console.error('Erro ao carregar viagens:', error);
      }
    };

    fetchTrips();
  }, []);

 
  const handleRateTrip = (id, rating) => {
    setRatings((prevRatings) => ({ ...prevRatings, [id]: rating }));
  };

  return (
    <div className="app-background">
      <div className="app-container">
        <h2 className="app-title">Caderno de Viagens</h2>
        {trips.length === 0 ? (
          <p>Nenhuma viagem disponível no momento.</p>
        ) : (
          <div className="book-list">
            {trips.map((trip) => (
              <BookCard
                key={trip.id}
                trip={trip}
                ratings={ratings}
                onRate={handleRateTrip}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FrontOffice;
