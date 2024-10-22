// src/SearchResults.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from './header.jsx'; // Importar o componente de cabeçalho
import '../App.css';

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Extrai o parâmetro de consulta da URL
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
      <h1>Resultados da Busca</h1>
      {error && <p>{error}</p>}
      <div className="movies-container">
        {movies.length > 0 ? (
          movies.map(movie => (
            <div className="movie-card" key={movie.id}>
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
    </div>
  );
};

export default SearchResults;
