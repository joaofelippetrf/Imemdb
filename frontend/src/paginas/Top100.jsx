import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './header.jsx'; // Importar o componente de cabeçalho
import '../App.css'; // Importar estilos
import Footer from './footer.jsx';

const TopMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8081/Movies/top100'); // Endpoint para os 100 filmes mais populares
        setMovies(response.data);
      } catch (error) {
        console.error('Erro ao buscar os 100 filmes:', error);
        setError('Erro ao carregar os filmes.');
      }
    };

    fetchTopMovies();
  }, []);

  return (
    <div className="container-fullscreen">
      <Header /> {/* Usar o cabeçalho aqui */}
      <h2 className='subtitulo'>Top 100 Filmes</h2>
      {error && <p>{error}</p>}
      <div className="movie-search">
        {movies.length > 0 ? (
        // Filtra filmes com posterpath disponível
        movies
          .filter(movie => movie.posterpath)
          .map(movie => (
            <div className="movie-card" id='top100' key={movie.id}>
              <a href={`/movies/${movie.id}`}> {/* Link para os detalhes do filme */}
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.posterpath}`}
                  alt={movie.originalTitle}
                  className="movie-poster"
                />
                <h2>{movie.originalTitle}</h2>
              </a>
            </div>
          ))
      ) : (
        <p>Nenhum filme encontrado.</p>
      )}
    </div>

      <Footer />
    </div>
  );
};

export default TopMovies;
