import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img
        src={book.coverURL || 'https://via.placeholder.com/150'}
        alt={book.title}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/150'; 
        }}
      />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </div>
  );
};

export default BookCard;

