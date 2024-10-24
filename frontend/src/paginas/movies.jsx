import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link } from 'react-router-dom';
import Header from './header.jsx'; 
import Footer from './footer.jsx';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [recentReleases, setRecentReleases] = useState([]); // Estado para lançamentos recentes
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);
  const recentCarouselRef = useRef(null); // Ref para o carrossel de lançamentos recentes

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8081/Movies/all');
        setMovies(response.data.slice(0, 20));
        
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        setError('Erro ao carregar filmes.');
      }
    };

    const fetchRecentReleases = async () => {
      try {
        const response = await axios.get('http://localhost:8081/Movies/recent'); // Endpoint para lançamentos recentes
        setRecentReleases(response.data.slice(0, 20));
      } catch (error) {
        console.error('Erro ao buscar lançamentos recentes:', error);
        setError('Erro ao carregar lançamentos recentes.');
      }
    };

    fetchMovies();
    fetchRecentReleases();
  }, []);

  // Funções de rolagem para os filmes populares
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

  // Funções de rolagem para os lançamentos recentes
  const scrollRecentLeft = () => {
    if (recentCarouselRef.current) {
      recentCarouselRef.current.scrollLeft -= 165;
    }
  };

  const scrollRecentRight = () => {
    if (recentCarouselRef.current) {
      recentCarouselRef.current.scrollLeft += 165;
    }
  };

  return (
    <div className="container-fullscreen">
      <Header /> 
      {error ? <p className="error-message">{error}</p> : null}

      {/* Seção de Filmes Populares */}
      <div className="movies-container">
        <h2 className='subtitulo'>Popular Movies</h2>
        <button className="scroll-btn left" onClick={scrollLeft}>&lt;</button>
        <div className="movies-carousel" ref={carouselRef}>
          {movies
            .filter((movie) => movie.posterpath) 
            .map((movie) => {
              const posterUrl = `https://image.tmdb.org/t/p/w500${movie.posterpath}`;

              return (
                <div className="movie-card" key={movie.id}>
                  <a href={`/movies/${movie.id}`}>
                    <img
                      src={posterUrl}
                      alt={movie.originalTitle}
                      className="movie-poster"
                    />
                  </a>
                </div>
              );
            })}
        </div>

        <button className="scroll-btn right" onClick={scrollRight}>&gt;</button>
      </div>

      <div className='movies-container'>
        <h2 className='subtitulo'>Recent Releases</h2>
        <button className="scroll-btn left" onClick={scrollRecentLeft}>&lt;</button>
        <div className="movies-carousel" ref={recentCarouselRef}>
          {recentReleases.length > 0 ? (
            recentReleases.map((movie) => {
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
            <p>Nenhum lançamento recente encontrado.</p>
          )}
        </div>
        <button className="scroll-btn right" onClick={scrollRecentRight}>&gt;</button>
      </div>

      <Footer />
    </div>
  );
};

export default MoviesList;
