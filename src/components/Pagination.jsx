import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div>
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Anterior
      </button>
      <span>{currentPage} de {totalPages}</span>
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Próximo
      </button>
    </div>
  );
};

export default Pagination;
