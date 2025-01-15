import React, { useState } from 'react';

const BookCard = ({ trip, ratings, onRate, isBackOffice, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedRating, setSelectedRating] = useState(
    ratings && ratings[trip.id] ? ratings[trip.id] : 0
  );

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRating = (id, star) => {
    setSelectedRating(star); // Atualiza o estado local para refletir a seleção
    onRate(id, star); // Chama a função onRate para persistir os dados
  };

  return (
    <div
      className={`book-card ${isExpanded ? 'expanded' : 'compact'}`}
      onClick={!isExpanded ? toggleExpand : undefined}
    >
      {/* Estado Compacto */}
      {!isExpanded && (
        <>
          <h3>{trip.local}</h3>
          <p>
            <strong>Ano:</strong> {trip.ano}
          </p>
        </>
      )}

      {/* Estado Expandido */}
      {isExpanded && (
        <>
          <div className="card-header">
            <span className="card-location">{trip.local}</span>
            <span className="card-year">{trip.ano}</span>
          </div>
          <p className="card-description">{trip.descricao}</p>

          {/* Estrelas de Avaliação (Somente no FrontOffice) */}
          {!isBackOffice && (
            <div
              className="rating"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0',
              }}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="star-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Impede o fechamento ao clicar nas estrelas
                    handleRating(trip.id, star);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    color: star <= selectedRating ? '#ffc107' : '#ccc', // Estrelas amarelas até a selecionada, cinza para o restante
                    transition: 'transform 0.2s ease, color 0.2s ease',
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          )}

          {/* Botões de Edição e Exclusão (Somente no BackOffice) */}
          {isBackOffice && (
            <div
              className="card-footer"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(trip);
                }}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '10px',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Editar
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(trip.id);
                }}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Excluir
              </button>
            </div>
          )}

          {/* Botão Fechar */}
          <button
            className="close-button"
            onClick={toggleExpand}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px',
              transition: 'background-color 0.3s ease',
            }}
          >
            Fechar
          </button>
        </>
      )}
    </div>
  );
};

export default BookCard;
