const API_URL = 'https://api.sheety.co/51b65bad1838e501d207e2f5f36dadf4/trips/página1';


export const getBooks = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data.página1; 
  } catch (error) {
    console.error('Erro ao buscar viagens:', error);
    throw error;
  }
};


export const createBook = async (newTrip) => {
  const body = {
    página1: {
      id: newTrip.id,
      local: newTrip.local,
      descricao: newTrip.descricao,
      ano: newTrip.ano,
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
    console.error('Erro ao adicionar viagem:', error);
    throw error;
  }
};


export const updateBook = async (id, updatedTrip) => {
  const body = {
    página1: {
      local: updatedTrip.local,
      descricao: updatedTrip.descricao,
      ano: updatedTrip.ano,
    },
  };

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
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
    console.error('Erro ao atualizar viagem:', error);
    throw error;
  }
};


export const deleteBook = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return true; 
  } catch (error) {
    console.error('Erro ao excluir viagem:', error);
    throw error;
  }
};