import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link } from 'react-router-dom';
import Header from './header.jsx'; 
import Footer from './footer.jsx';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8081/Movies/all');
        setMovies(response.data);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        setError('Erro ao carregar filmes.');
      }
    };
    fetchMovies();
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 165;
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 165;
    }
  };

  return (
    <div className="container-fullscreen">
      <Header /> 
      {error ? <p className="error-message">{error}</p> : null}

      <div className="movies-container">
        <h2 className='subtitulo'>Filmes Populares</h2>
        <button className="scroll-btn left" onClick={scrollLeft}>&lt;</button>
        <div className="movies-carousel" ref={carouselRef}>
          {movies.map((movie) => {
            const posterUrl = movie.posterpath
              ? `https://image.tmdb.org/t/p/w500${movie.posterpath}`
              : 'https://via.placeholder.com/500x750?text=Imagem+não+disponível';

            return (
              <div className="movie-card" key={movie.id}>
                {/* Link para a página de detalhes do filme */}
                <Link to={`/movies/${movie.id}`}>
                  <img
                    src={posterUrl}
                    alt={movie.originalTitle}
                    className="movie-poster"
                  />
                </Link>
              </div>
            );
          })}
        </div>
        <button className="scroll-btn right" onClick={scrollRight}>&gt;</button>
      </div>

      <h2 className='subtitulo'>Lançamentos Recentes</h2>
      <Footer/>
    </div>
  );
};

export default MoviesList;