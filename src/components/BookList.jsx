import React, { useState, useEffect } from 'react';
import { getTrips } from '../api';
import BookCard from './BookCard';

const BookList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const data = await getTrips();
      setTrips(data);
    };
    fetchTrips();
  }, []);

  return (
    <div>
      {trips.map((trip) => (
        <BookCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default BookList;
