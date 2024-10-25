
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from './header.jsx'; 
import '../App.css';
import Footer from './footer.jsx';

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/Movies/busca?query=${query}`);
        setMovies(response.data);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        setError('Erro ao carregar resultados de busca.');
      }
    };

    if (query) {
      fetchMovies();
    }
  }, [query]);

  return (
    <div className="container-fullscreen">
      <Header /> {/* Usar o cabeçalho aqui */}
      <h2 className='subtitulo'>Search Results</h2>
      {error && <p>{error}</p>}
      <div className="movie-search">
        {movies.length > 0 ? (
          movies
            .filter(movie => movie.posterpath) // Filtra os filmes que têm posterpath
            .map(movie => (
              <div className="movie-card"  id='search' key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.posterpath}`}
                  alt={movie.originalTitle}
                  className="movie-poster"
                />
                <h2>{movie.originalTitle}</h2>
              </div>
            ))
        ) : (
          <p>Nenhum resultado encontrado.</p>
        )}
      </div>
      <div className="spacer"></div>
      <Footer />
    </div>
  );
};

export default SearchResults;
