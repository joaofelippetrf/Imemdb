import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link } from 'react-router-dom';
import Header from './header.jsx';
import Footer from './footer.jsx';

const GenresCarousel = () => {
  const [genres] = useState([
    'Action', 'Comedy', 'Drama', 'Horror', 'Romance'
  ]); // Lista de gêneros a serem buscados
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [error, setError] = useState(null);

  const carouselRefs = useRef({}); // Referências para múltiplos carrosséis

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

    genres.forEach(fetchMoviesByGenre); // Buscar filmes para cada gênero
  }, [genres]);

  // Funções de rolagem para os carrosséis
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
      {error ? <p className="error-message">{error}</p> : null}

      {genres.map((genre) => (
        <div key={genre} className="movie-container">
          <h2 className="subtitulo">{genre} Filmes</h2>
          <button className="scroll-btn left" onClick={() => scrollLeft(genre)}>
            &lt;
          </button>
          <div
            className="movies-carousel"
            ref={(el) => (carouselRefs.current[genre] = el)} // Salva referência para cada carrossel
          >
            {moviesByGenre[genre] && moviesByGenre[genre].length > 0 ? (
              moviesByGenre[genre].map((movie) => {
                const posterUrl = movie.posterpath
                  ? `https://image.tmdb.org/t/p/w500${movie.posterpath}`
                  : 'https://via.placeholder.com/500x750?text=Imagem+não+disponível';

                return (
                  <div className="movie-card" key={movie.id}>
                    <Link to={`/movies/${movie.id}`}>
                      <img
                        src={posterUrl}
                        alt={movie.originalTitle}
                        className="movie-poster"
                      />
                    </Link>
                  </div>
                );
              })
            ) : (
              <p>Nenhum filme encontrado para {genre}.</p>
            )}
          </div>
          <button className="scroll-btn right" onClick={() => scrollRight(genre)}>
            &gt;
          </button>
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default GenresCarousel;
