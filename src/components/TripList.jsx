import React, { useState, useEffect } from 'react';
import { getTrips } from '../api';
import TripCard from './TripCard';

const TripList = () => {
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
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default TripList;
