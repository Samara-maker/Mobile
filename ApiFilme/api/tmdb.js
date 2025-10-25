import axios from 'axios';

const API_KEY = '26cd1e145ab15dbc95b5fc941e2a4967'; 

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

// Buscar filmes
export const searchMovies = async (query) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        api_key: API_KEY,
        language: 'pt-BR',
        query: query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
  }
};

// Buscar detalhes de um filme específico
export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'pt-BR',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme:', error);
  }
};
