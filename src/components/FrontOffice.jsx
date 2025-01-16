import React, { useState, useEffect } from 'react';
import { getTrips } from '../Api';
import TripCard from './TripCard';

const FrontOffice = () => {
  const [trips, setTrips] = useState([]);
  const [ratings, setRatings] = useState({}); // Estado para armazenar as avaliações
  const [searchLocal, setSearchLocal] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [filteredTrips, setFilteredTrips] = useState([]);

  // Fetch inicial das viagens
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getTrips();
        setTrips(data);
        setFilteredTrips(data); // Inicializa os resultados filtrados
      } catch (error) {
        console.error('Erro ao carregar viagens:', error);
      }
    };

    fetchTrips();
  }, []);

  // Função para lidar com a avaliação de uma viagem
  const handleRating = (id, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [id]: rating, // Atualiza a avaliação da viagem correspondente
    }));
  };

  // Atualiza os resultados filtrados com base nos critérios de busca
  useEffect(() => {
    const filterTrips = () => {
      const lowerCaseSearchLocal = searchLocal.toLowerCase();
      const filtered = trips.filter((trip) => {
        const matchesLocal = trip.local.toLowerCase().includes(lowerCaseSearchLocal);
        const matchesYear = searchYear
          ? String(trip.ano) === String(searchYear) // Converte ambos para string para evitar problemas de comparação
          : true;
        return matchesLocal && matchesYear;
      });
      setFilteredTrips(filtered);
    };

    filterTrips();
  }, [searchLocal, searchYear, trips]);

  return (
    <div className="app-background">
      <div className="app-container">
        <h2 className="app-title">Explorar Viagens</h2>

        {/* Formulário de Busca */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por Local"
            value={searchLocal}
            onChange={(e) => setSearchLocal(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Buscar por Ano"
            value={searchYear}
            onChange={(e) => setSearchYear(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Lista de Viagens */}
        <div className="trip-list">
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                ratings={ratings} // Passa as avaliações
                onRate={handleRating} // Passa a função de avaliação
              />
            ))
          ) : (
            <p>Nenhuma viagem encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FrontOffice;
