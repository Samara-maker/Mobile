import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import MovieItem from '../components/MovieItem';
import { searchMovies } from '../api/tmdb';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    const results = await searchMovies(query);
    setMovies(results);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        placeholder="Digite o nome do filme"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button title="Buscar" onPress={handleSearch} />
      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieItem movie={item} onPress={() => navigation.navigate('Details', { movieId: item.id })} />
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
});
