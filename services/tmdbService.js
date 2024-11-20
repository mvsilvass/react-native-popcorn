const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3/';

export const fetchTopRatedContent = async (mediaType, totalPages = 20) => {
  try {
    let allResults = [];
    const url = `${BASE_URL}${mediaType}/top_rated?api_key=${API_KEY}&language=pt-BR&page=`;

    for (let page = 1; page <= totalPages; page++) {
      const response = await fetch(`${url}${page}`);
      if (!response.ok) {
        throw new Error(`Falha ao buscar os mídia`);
      }
      const data = await response.json();
      allResults = [...allResults, ...data.results];
    }

    return allResults;
  } catch (error) {
    console.error(`Falha ao buscar mídia`, error);
    return [];
  }
};

export const fetchGenres = async (mediaType) => {
  try {
    const response = await fetch(
      `${BASE_URL}genre/${mediaType}/list?api_key=${API_KEY}&language=pt-BR`
    );

    if (!response.ok) {
      throw new Error('Falha ao buscar os gêneros');
    }

    const data = await response.json();
    const genres = data.genres.reduce((map, genre) => {
      map[genre.id] = genre.name;
      return map;
    }, {});

    return genres;
  } catch (error) {
    console.error('Falha ao buscar os gêneros', error);
    return {};
  }
};

export const fetchMediaCredits = async (mediaId, mediaType) => {
  try {
    const response = await fetch(
      `${BASE_URL}${mediaType}/${mediaId}/credits?api_key=${API_KEY}&language=pt-BR`
    );

    if (!response.ok) {
      throw new Error('Falha ao buscar os créditos');
    }

    const data = await response.json();

    return {
      cast: data.cast,
      crew: data.crew,
    };
  } catch (error) {
    console.error('Falha ao buscar os créditos', error);
    return {
      cast: [],
      crew: [],
    };
  }
};
