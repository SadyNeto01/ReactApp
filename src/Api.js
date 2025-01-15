const API_URL = 'https://api.sheety.co/ae3e039275c0f8b45406f799341140bc/booksApi/página1';

// Função para buscar a capa do livro pela Open Library API
export const fetchCoverFromOpenLibrary = async (title) => {
  const apiUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();

    if (data.docs && data.docs.length > 0) {
      const coverId = data.docs[0].cover_i; // ID da capa do livro
      if (coverId) {
        return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`; // Retorna a URL da capa
      }
    }
    return null; // Retorna null se não encontrar a capa
  } catch (error) {
    console.error('Erro ao buscar capa na Open Library API:', error);
    return null; // Retorna null em caso de erro
  }
};

// Método GET - Buscar todos os livros
export const getBooks = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data.página1; // Retorna a lista de livros
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    throw error;
  }
};

// Método POST - Criar um novo livro
export const createBook = async (newBook) => {
  const body = {
    página1: {
      id: newBook.id,
      title: newBook.title,
      author: newBook.author,
      coverURL: newBook.coverURL, // Inclui o campo coverURL
    },
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    throw error;
  }
};

// Método PUT - Atualizar um livro existente
export const updateBook = async (id, updatedBook) => {
  const body = {
    página1: {
      id: updatedBook.id,
      title: updatedBook.title,
      author: updatedBook.author,
      coverURL: updatedBook.coverURL, // Inclui o campo coverURL
    },
  };

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    throw error;
  }
};

// Método DELETE - Deletar um livro
export const deleteBook = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return true; // Sucesso
  } catch (error) {
    console.error('Erro ao excluir livro:', error);
    throw error;
  }
};
