import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Link } from 'react-router-dom';
import Header from './header.jsx'; 
import Footer from './footer.jsx';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [recentReleases, setRecentReleases] = useState([]);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);
  const recentCarouselRef = useRef(null);

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
        const response = await axios.get('http://localhost:8081/Movies/recent');
        setRecentReleases(response.data.slice(0, 20));
      } catch (error) {
        console.error('Erro ao buscar lançamentos recentes:', error);
        setError('Erro ao carregar lançamentos recentes.');
      }
    };

    fetchMovies();
    fetchRecentReleases();
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

      
      <div className="movies-container">
        <h2 className='subtitulo'>Movies you may like</h2>
        <button className="scroll-btn left" onClick={scrollLeft}>&lt;</button>
        <div className="movies-carousel" ref={carouselRef}>
          {movies.length > 0 ? (
            movies
              .filter((movie) => movie.posterpath) 
              .map((movie) => {
                const posterUrl = `https://image.tmdb.org/t/p/w500${movie.posterpath}`;

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
            <p></p>
          )}
        </div>

        <button className="scroll-btn right" onClick={scrollRight}>&gt;</button>
      </div>

      
      <div className='movies-container'>
        <h2 className='subtitulo'>Recent Releases</h2>
        <button className="scroll-btn left" onClick={scrollRecentLeft}>&lt;</button>
        <div className="movies-carousel" ref={recentCarouselRef}>
          {recentReleases.length > 0 ? (
            recentReleases
              .filter((movie) => movie.posterpath) // Filtra apenas filmes com pôster
              .map((movie) => {
                const posterUrl = `https://image.tmdb.org/t/p/w500${movie.posterpath}`;

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
            <p></p>
          )}
        </div>
        <button className="scroll-btn right" onClick={scrollRecentRight}>&gt;</button>
      </div>
      <div className="spacer"></div>
      <Footer />
    </div>
  );
};

export default MoviesList;
