import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './header.jsx';
import '../App.css'; 
import Footer from './footer.jsx';

const TopMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8081/Movies/top100'); 
        setMovies(response.data.slice(0, 100)); 
      } catch (error) {
        console.error('Erro ao buscar os 100 filmes:', error);
        setError('Erro ao carregar os filmes.');
      }
    };

    fetchTopMovies();
  }, []);

  return (
    <div className="container-fullscreen">
      <Header /> 
      <h2 className='subtitulo'>Top 100 Movies</h2>
      {error && <p className="error-message">{error}</p>} 
      <div className="movie-search">
        {movies.length > 0 ? (
          
          movies
            .filter(movie => movie.posterpath)
            .map(movie => (
              <div className="movie-card" id='top100' key={movie.id}>
                <a href={`/movies/${movie.id}`}> 
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
