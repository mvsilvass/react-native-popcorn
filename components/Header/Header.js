import { View, Text, Image, StyleSheet } from 'react-native';

import Navbar from './Navbar/Navbar';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/popcorn.png')}
          style={{ width: 30, height: 30 }}
        />
        <Text style={styles.title}>Popcorn</Text>
      </View>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
