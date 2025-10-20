import axios from 'axios';

import { TMDB_API_KEY } from '@env';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const imageUrl = (path) => `https://image.tmdb.org/t/p/w500${path}`;

export const searchMovies = async (query) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        api_key: TMDB_API_KEY,
        language: 'pt-BR',
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return [];
  }
};
