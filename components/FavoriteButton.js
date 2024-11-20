import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function FavoriteButton({
  onToggle,
  isFavorite,
  styles = [{}],
}) {
  const combinedStyles = StyleSheet.flatten(styles);
  return (
    <TouchableOpacity onPress={onToggle}>
      <Text style={combinedStyles}>{isFavorite ? '❤️' : '🤍'}</Text>
    </TouchableOpacity>
  );
}
