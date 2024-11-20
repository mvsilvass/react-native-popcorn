import MediaPage from '../components/MediaPage';

export default function AnimePage() {
  return (
    <MediaPage
      genreFilter={16}
      loadingText="Carregando animes..."
      mediaType="tv"
    />
  );
}
