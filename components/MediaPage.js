import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './Header/Header';
import MediaCard from './MediaCard';

import { fetchTopRatedContent, fetchGenres } from '../services/tmdbService';

export default function MediaPage({ genreFilter, mediaType, loadingText }) {
  const [media, setMedia] = useState([
    {
      id: '',
      title: '',
      name: '',
      vote_average: null,
      original_title: '',
      original_name: '',
      release_date: '',
      first_air_date: '',
      poster_path: '',
      genre_ids: [],
      overview: '',
    },
  ]);
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [mediaData, genresData] = await Promise.all([
          fetchTopRatedContent(mediaType),
          fetchGenres(mediaType),
        ]);
        setMedia(mediaData);
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [mediaType]);

  const filteredMedia = media
    .filter((item) => {
      if (!item || typeof item !== 'object') return false;
      if (!item.title && !item.name) return false;
      return searchText
        ? (item.title || item.name)
            .toLowerCase()
            .includes(searchText.toLowerCase())
        : true;
    })
    .filter(
      (item) =>
        !genreFilter ||
        (Array.isArray(item.genre_ids) &&
          item.genre_ids.includes(Number(genreFilter)))
    );

  return (
    <SafeAreaView style={styles.mediaPageContainer}>
      <Header />
      {loading ? (
        <Text style={styles.loadingText}>{loadingText}</Text>
      ) : (
        <>
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#aaa" style={styles.icon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar mídia..."
              placeholderTextColor="#aaa"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
          </View>
          <FlatList
            data={filteredMedia}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MediaCard
                id={item.id}
                title={item.title || item.name}
                rating={item.vote_average}
                originalTitle={item.original_title || item.original_name}
                releaseDate={item.release_date || item.first_air_date}
                posterPath={item.poster_path}
                genreIds={item.genre_ids}
                overview={item.overview}
                genres={genres}
                mediaType={mediaType}
              />
            )}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mediaPageContainer: {
    backgroundColor: '#000',
    height: '100vh',
    width: '100%',
    flex: 1,
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
});
