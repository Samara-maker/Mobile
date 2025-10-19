import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function MovieItem({ movie, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {movie.poster_path && (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
          style={styles.poster}
        />
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text>{movie.release_date}</Text>
        <Text numberOfLines={3}>{movie.overview}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginBottom: 15 },
  poster: { width: 100, height: 150, marginRight: 10 },
  title: { fontWeight: 'bold', fontSize: 16 },
});
