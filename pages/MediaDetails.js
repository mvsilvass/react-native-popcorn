import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import { fetchMediaCredits } from '../services/tmdbService';
import Header from '../components/Header/Header';

export default function MediaDetails({ route }) {
  const {
    title,
    originalTitle,
    overview,
    posterPath,
    releaseDate,
    genreNames,
    rating,
    stars,
    id,
    mediaType,
  } = route.params;

  const [credits, setCredits] = useState({
    cast: [
      {
        id: '',
        name: '',
        character: '',
      },
    ],
    crew: [
      {
        id: '',
        name: '',
        job: '',
      },
    ],
  });

  const releaseDateFormatted = new Date(releaseDate).toLocaleDateString();

  useEffect(() => {
    const loadCredits = async () => {
      const fetchedCredits = await fetchMediaCredits(id, mediaType);
      setCredits(fetchedCredits);
    };

    loadCredits();
  }, [id, mediaType]);

  return (
    <SafeAreaView style={styles.mediaDetailsContainer}>
      <Header />
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.originalTitle}>{originalTitle}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Image
            style={styles.posterImage}
            source={{ uri: `https://image.tmdb.org/t/p/w500${posterPath}` }}
          />
          <View style={styles.detailsContainer}>
            {credits.crew
              .filter((member) =>
                ['Director', 'Writer', 'Producer'].includes(member.job)
              )
              .map((crewMember) => (
                <Text key={crewMember.id} style={styles.detailText}>
                  {crewMember.name} - {crewMember.job}
                </Text>
              ))}

            <Text style={styles.detailText}>
              Lançamento: {releaseDateFormatted}
            </Text>
            <Text style={styles.detailText}>Gêneros: {genreNames}</Text>
            <Text style={styles.rating}>
              {stars} {rating.toFixed(2)}
            </Text>
          </View>
        </View>

        <Text style={styles.sinopseTitle}>Sinopse</Text>
        <Text style={styles.sinopse}>{overview}</Text>

        <View style={styles.creditsContainer}>
          <Text style={styles.creditsTitle}>Elenco</Text>
          {credits.cast.slice(0, 10).map((actor) => (
            <Text key={actor.id} style={styles.creditItem}>
              {actor.name} como {actor.character}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mediaDetailsContainer: {
    backgroundColor: '#000000',
    flex: 1,
  },
  scrollViewContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    flexGrow: 1,
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  originalTitle: {
    color: '#D8E9F0',
    fontSize: 15,
    fontStyle: 'italic',
    marginTop: 5,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
  },
  posterImage: {
    width: 150,
    height: 'auto',
    minHeight: 200,
    borderRadius: 8,
    marginRight: 20,
    marginBottom: 10,
  },
  detailsContainer: {
    justifyContent: 'space-between',
    alignContent: 'center',
    flex: 1,
  },
  rating: {
    color: '#ffd700',
    fontSize: 18,
  },
  detailText: {
    color: '#D8E9F0',
    fontSize: 15,
    flexShrink: 1,
    width: '100%',
  },
  sinopseTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  sinopse: {
    color: '#D8E9F0',
    fontSize: 16,
    marginTop: 10,
    lineHeight: 24,
    textAlign: 'justify',
  },
  creditsContainer: {
    marginBottom: 20,
  },
  creditsTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  creditItem: {
    marginTop: 10,
    color: '#D8E9F0',
    fontSize: 16,
    lineHeight: 24,
  },
});
