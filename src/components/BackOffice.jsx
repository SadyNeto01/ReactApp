import React, { useState, useEffect } from 'react';
import { getBooks, createBook, updateBook, deleteBook } from '../Api';
import BookCard from './BookCard';

const BackOffice = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    id: '',
    title: '',
    author: '',
    coverURL: '',
  });
  const [editingBook, setEditingBook] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  // Carrega os livros ao iniciar o componente
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error('Erro ao carregar livros:', error);
      }
    };

    fetchBooks();
  }, []);

  // Adicionar um novo livro
  const handleAddBook = async () => {
    if (!newBook.id || !newBook.title || !newBook.author || !newBook.coverURL) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    try {
      await createBook(newBook);
      setBooks((prevBooks) => [...prevBooks, newBook]);
      setNewBook({ id: '', title: '', author: '', coverURL: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    }
  };

  // Iniciar a edição de um livro
  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowEditForm(true);
  };

  // Salvar alterações em um livro
  const handleUpdateBook = async () => {
    if (!editingBook.id || !editingBook.title || !editingBook.author || !editingBook.coverURL) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    try {
      await updateBook(editingBook.id, editingBook);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editingBook.id ? editingBook : book
        )
      );
      setEditingBook(null);
      setShowEditForm(false);
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };

  // Excluir um livro
  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    }
  };

  return (
    <div className="app-background">
      <div className="app-container">
        <h2 className="app-title">Gerenciar Livros</h2>

        {/* Botão para abrir/fechar o formulário de adição */}
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Fechar Formulário' : 'Adicionar Livro'}
        </button>

        {/* Formulário de adição de livros */}
        {showAddForm && (
          <div className="add-book-form">
            <h3>Adicionar Livro</h3>
            <input
              type="text"
              placeholder="Título"
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Autor"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="URL da Capa"
              value={newBook.coverURL}
              onChange={(e) =>
                setNewBook({ ...newBook, coverURL: e.target.value })
              }
            />
            <button onClick={handleAddBook}>Salvar</button>
          </div>
        )}

        {/* Formulário de edição de livros */}
        {showEditForm && (
          <div className="edit-book-form">
            <h3>Editar Livro</h3>
            <input
              type="text"
              placeholder="Título"
              value={editingBook.title}
              onChange={(e) =>
                setEditingBook({ ...editingBook, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Autor"
              value={editingBook.author}
              onChange={(e) =>
                setEditingBook({ ...editingBook, author: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="URL da Capa"
              value={editingBook.coverURL}
              onChange={(e) =>
                setEditingBook({ ...editingBook, coverURL: e.target.value })
              }
            />
            <button onClick={handleUpdateBook}>Salvar Alterações</button>
          </div>
        )}

        {/* Lista de livros */}
        <div className="book-list">
          {books.map((book) => (
            <div key={book.id}>
              <BookCard book={book} />
              <button onClick={() => handleEditBook(book)}>Editar</button>
              <button onClick={() => handleDeleteBook(book.id)}>Excluir</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackOffice;
