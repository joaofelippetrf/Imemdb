import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './header';
import Footer from './footer';

const MovieDetails = () => {
  const { id } = useParams(); // Pega o id do filme a partir da URL
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null); // Ref for the carousel

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/Movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
        setError('Erro ao carregar detalhes do filme.');
      }
    };

    fetchMovie();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Carregando...</p>;
  }

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 150, behavior: 'smooth' });
  };

  return (
    <div className="movie-details">
      <Header />
      <h1 className="subtitulo">{movie.originalTitle}</h1>
      <img
        src={movie.posterpath ? `https://image.tmdb.org/t/p/w500${movie.posterpath}` : 'https://via.placeholder.com/500x750?text=Imagem+não+disponível'}
        alt={movie.originalTitle}
      />
      <p><strong className='subtitulo'>Diretor:</strong> {movie.director}</p>
      <p className='subtitulo'><strong>Data de lançamento:</strong> {movie.releaseDate}</p>
      <p><strong className='subtitulo'>Sinopse:</strong> {movie.synopsis}</p>

      {/* Carousel for related movies or similar */}
      <div className="movies-container">
        <button className="scroll-btn left" onClick={scrollLeft}>‹</button>
        <div className="movies-carousel" ref={carouselRef}>
          {/* Map through related movies to display them here */}
          {/* Example: movies.map(movie => <MovieCard key={movie.id} movie={movie} />) */}
        </div>
        <button className="scroll-btn right" onClick={scrollRight}>›</button>
      </div>

      <Footer />
    </div>
  );
};

export default MovieDetails;
