import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

import MoviePage from './pages/MoviePage';
import TvSeriePage from './pages/TvSeriePage';
import AnimePage from './pages/AnimePage';
import MediaDetails from './pages/MediaDetails';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Movie">
        <Stack.Screen
          name="Movie"
          component={MoviePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Serie"
          component={TvSeriePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Anime"
          component={AnimePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MediaDetails"
          component={MediaDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
