import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function Navbar() {
  const navigation = useNavigation();
  return (
    <View style={styles.navbarContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Movie')}>
        <Text style={styles.navbarText}>Filmes</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Serie')}>
        <Text style={styles.navbarText}>Séries</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Anime')}>
        <Text style={styles.navbarText}>Animes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    marginTop: 5,
    backgroundColor: '#EC4646',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  navbarText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
