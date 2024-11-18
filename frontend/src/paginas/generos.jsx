import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link } from 'react-router-dom';
import Header from './header.jsx';
import Footer from './footer.jsx';

const GenresCarousel = () => {
  const [genres] = useState([
    'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Animation'
  ]); 
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [error, setError] = useState(null);

  const carouselRefs = useRef({}); 

  useEffect(() => {
    const fetchMoviesByGenre = async (genre) => {
      try {
        const response = await axios.get(`http://localhost:8081/Movies/search/genre/${genre}`);
        setMoviesByGenre((prev) => ({
          ...prev,
          [genre]: response.data,
        }));
      } catch (error) {
        console.error(`Erro ao buscar filmes para o gênero ${genre}:`, error);
        setError(`Erro ao carregar filmes para o gênero ${genre}.`);
      }
    };

    genres.forEach(fetchMoviesByGenre); 
  }, [genres]);

 
  const scrollLeft = (genre) => {
    if (carouselRefs.current[genre]) {
      carouselRefs.current[genre].scrollLeft -= 165;
    }
  };

  const scrollRight = (genre) => {
    if (carouselRefs.current[genre]) {
      carouselRefs.current[genre].scrollLeft += 165;
    }
  };

  return (
    <div className="container-fullscreen">
      <Header />
      {error && <p className="error-message">{error}</p>} 

      {genres.map((genre) => (
        <div key={genre} className="movies-container">
          <h2 className="subtitulo">{genre} Movies</h2>
          <button className="scroll-btn left" onClick={() => scrollLeft(genre)}>&lt;</button>
          
          <div className="movies-carousel" ref={(el) => (carouselRefs.current[genre] = el)}>
            {moviesByGenre[genre] && moviesByGenre[genre].length > 0 ? (
              moviesByGenre[genre]
                .filter((movie) => movie.posterpath) 
                .map((movie) => {
                  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.posterpath}`;
                  return (
                    <div className="movie-card" key={movie.id}>
                      <Link to={`/movies/${movie.id}`}>
                        <img src={posterUrl} alt={movie.originalTitle} className="movie-poster" />
                      </Link>
                    </div>
                  );
                })
            ) : (
              <p>Nenhum filme encontrado para {genre}.</p>
            )}
          </div>

          <button className="scroll-btn right" onClick={() => scrollRight(genre)}>&gt;</button>
        </div>
      ))}

      <Footer />
      <div className="spacer"></div>
    </div>
  );
};

export default GenresCarousel;
