import React, { useState, useEffect } from 'react';
import { getBooks } from '../Api';
import BookCard from './BookCard';

const FrontOffice = () => {
  const [books, setBooks] = useState([]);

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

  return (
    <div className="app-background">
      <div className="app-container">
        <h2 className="app-title">Catálogo de Livros</h2>
        <div className="book-list">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrontOffice;
