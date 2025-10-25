import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { getMovieDetails } from '../api/tmdb';

export default function DetailsScreen({ route }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieDetails(movieId);
      setMovie(data);
      setLoading(false);
    };
    fetchMovie();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;

  return (
    <ScrollView style={{ padding: 10 }}>
      {movie.poster_path && (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}` }}
          style={styles.poster}
        />
      )}
      <Text style={styles.title}>{movie.title}</Text>
      <Text>Avaliação: {movie.vote_average}</Text>
      <Text>Data de lançamento: {movie.release_date}</Text>
      <Text style={{ marginTop: 10 }}>{movie.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  poster: { width: '100%', height: 400, marginBottom: 10 },
  title: { fontWeight: 'bold', fontSize: 22, marginBottom: 5 },
});
