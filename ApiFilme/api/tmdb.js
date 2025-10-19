import axios from 'axios';
import { TMDB_API_KEY } from '@env'; // Certifique-se de instalar o react-native-dotenv se necessário

const BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: { api_key: TMDB_API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
searchMovies('Matrix').then(console.log);
