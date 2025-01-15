import React from 'react';

const BookCard = ({ trip, onEdit, onDelete, ratings, onRate }) => {
  return (
    <div className="book-card">
      <h3>{trip.local}</h3>
      <p>{trip.descricao}</p>
      <p><strong>Ano:</strong> {trip.ano}</p>

      {/* Avaliação (apenas para FrontOffice) */}
      {onRate && (
        <div className="rating">
          <label>Avaliação: </label>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`star-button ${ratings[trip.id] === star ? 'selected' : ''}`}
              onClick={() => onRate(trip.id, star)}
            >
              {star}⭐
            </button>
          ))}
        </div>
      )}

      {/* Botões de Ação (apenas para BackOffice) */}
      {onEdit && onDelete && (
        <div className="actions">
          <button onClick={() => onEdit(trip)}>Editar</button>
          <button onClick={() => onDelete(trip.id)}>Excluir</button>
        </div>
      )}
    </div>
  );
};

export default BookCard;
