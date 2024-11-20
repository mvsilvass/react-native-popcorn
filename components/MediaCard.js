import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FavoriteButton from './FavoriteButton';

export default function MediaCard({
  title,
  rating,
  originalTitle,
  releaseDate,
  posterPath,
  genreIds,
  overview,
  genres,
  mediaType,
  id,
}) {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const emptyStars = 5 - fullStars;

    return [...Array(fullStars).fill('⭐'), ...Array(emptyStars).fill('☆')];
  };

  const releaseYear = releaseDate ? releaseDate.substring(0, 4) : '';
  const genreNames = genreIds
    .map((id) => genres[id] || 'Gênero desconhecido')
    .join(', ');

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity
      style={styles.mediaCardContainer}
      onPress={() => {
        navigation.navigate('MediaDetails', {
          title,
          rating,
          originalTitle,
          releaseDate,
          posterPath,
          overview,
          genreNames,
          mediaType,
          id,
          stars: renderStars(rating),
        });
      }}>
      <View style={styles.card}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${posterPath}` }}
          style={styles.porterImage}
        />
        <View style={styles.info}>
          <Text style={styles.title}>
            {title} ({releaseYear})
          </Text>
          <Text style={styles.genre}>{genreNames}</Text>

          <View style={styles.row}>
            <Text style={styles.rating}>{renderStars(rating)}</Text>
            <Text style={styles.ratingNumber}>{rating.toFixed(1)}</Text>

            <FavoriteButton
              styles={{ fontSize: 15, marginTop: 2 }}
              onToggle={toggleFavorite}
              isFavorite={isFavorite}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mediaCardContainer: {
    backgroundColor: '#000000',
    padding: 10,
    flex: 1,
  },
  card: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  porterImage: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginRight: 20,
  },
  info: {
    justifyContent: 'space-between',
    flex: 1,
    height: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  genre: {
    color: '#1687A7',
    fontSize: 12,
    textAlign: 'justify',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rating: {
    color: '#ffd700',
    fontSize: 20,
  },
  ratingNumber: {
    marginTop: 2,
    marginLeft: 10,
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
