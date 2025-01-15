import React, { useState, useEffect } from 'react';
import { getBooks, createBook, updateBook, deleteBook } from '../Api';
import BookCard from './BookCard';

const BackOffice = () => {
  const [trips, setTrips] = useState([]);
  const [newTrip, setNewTrip] = useState({
    id: '',
    local: '',
    descricao: '',
    ano: '',
  });
  const [editingTrip, setEditingTrip] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Carregar viagens ao iniciar
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getBooks();
        setTrips(data);
      } catch (error) {
        console.error('Erro ao carregar viagens:', error);
      }
    };

    fetchTrips();
  }, []);

  // Validação de dados
  const validateTrip = ({ local, descricao, ano }) => {
    if (!local || !descricao || !ano) {
      return 'Todos os campos são obrigatórios!';
    }
    if (!/^\d{4}$/.test(ano) || ano < 1900 || ano > new Date().getFullYear()) {
      return 'O ano deve ser um número entre 1900 e o ano atual.';
    }
    return null;
  };

  // Adicionar nova viagem
  const handleAddTrip = async () => {
    const validationError = validateTrip(newTrip);
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      await createBook(newTrip);
      setTrips((prevTrips) => [...prevTrips, newTrip]);
      setNewTrip({ id: '', local: '', descricao: '', ano: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Erro ao adicionar viagem:', error);
    }
  };

  // Preparar viagem para edição
  const handleEditTrip = (trip) => {
    setEditingTrip(trip);
    setShowEditForm(true);
  };

  // Salvar alterações na viagem
  const handleUpdateTrip = async () => {
    const validationError = validateTrip(editingTrip);
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      await updateBook(editingTrip.id, editingTrip);
      setTrips((prevTrips) =>
        prevTrips.map((trip) =>
          trip.id === editingTrip.id ? editingTrip : trip
        )
      );
      setEditingTrip(null);
      setShowEditForm(false);
    } catch (error) {
      console.error('Erro ao atualizar viagem:', error);
    }
  };

  // Excluir viagem
  const handleDeleteTrip = async (id) => {
    try {
      await deleteBook(id);
      setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
    } catch (error) {
      console.error('Erro ao excluir viagem:', error);
    }
  };

  return (
    <div className="app-background">
      <div className="app-container">
        <h2 className="app-title">Gerenciar Viagens</h2>

        {/* Botão para abrir/fechar formulário de adição */}
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Fechar Formulário' : 'Adicionar Viagem'}
        </button>

        {/* Formulário para adicionar viagem */}
        {showAddForm && (
          <div className="add-book-form">
            <h3>Adicionar Viagem</h3>
            <input
              type="text"
              placeholder="Local"
              value={newTrip.local}
              onChange={(e) => setNewTrip({ ...newTrip, local: e.target.value })}
            />
            <input
              type="text"
              placeholder="Descrição"
              value={newTrip.descricao}
              onChange={(e) =>
                setNewTrip({ ...newTrip, descricao: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Ano"
              value={newTrip.ano}
              onChange={(e) => setNewTrip({ ...newTrip, ano: e.target.value })}
            />
            <button onClick={handleAddTrip}>Salvar</button>
          </div>
        )}

        {/* Formulário para editar viagem */}
        {showEditForm && (
          <div className="edit-book-form">
            <h3>Editar Viagem</h3>
            <input
              type="text"
              placeholder="Local"
              value={editingTrip.local}
              onChange={(e) =>
                setEditingTrip({ ...editingTrip, local: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Descrição"
              value={editingTrip.descricao}
              onChange={(e) =>
                setEditingTrip({ ...editingTrip, descricao: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Ano"
              value={editingTrip.ano}
              onChange={(e) =>
                setEditingTrip({ ...editingTrip, ano: e.target.value })
              }
            />
            <button onClick={handleUpdateTrip}>Salvar Alterações</button>
          </div>
        )}

        {/* Lista de viagens */}
        <div className="book-list">
          {trips.map((trip) => (
            <BookCard
              key={trip.id}
              trip={trip}
              onEdit={handleEditTrip}
              onDelete={handleDeleteTrip}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackOffice;

