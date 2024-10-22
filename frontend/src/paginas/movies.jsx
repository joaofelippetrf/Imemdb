import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/App.css';
import logo from '/src/assets/logo.png';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null); // Referência para o carrossel

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

  // Função para rolar o carrossel
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= 165; // Ajuste a quantidade de rolagem
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += 165; // Ajuste a quantidade de rolagem
    }
  };

  return (
    <div className="container-fullscreen">
      <header>
        <img className="logoime" src={logo} alt="Logo IMEdb" />
        <input type="text" placeholder="Pesquisar..." />
        <h1>IMEdb</h1>
        <a href="" className='info'>Inicio</a>
        <a href="" className='info'>Genero</a>
        <a href="" className='info'>Top 100 Filmes</a>
      </header>
      
      {error ? <p>{error}</p> : null}
      
      <div className="movies-container">
        <h2 className='subtitulo'>Filmes Populares</h2>
        <button className="scroll-btn left" onClick={scrollLeft}>&lt;</button> {/* Botão para rolar à esquerda */}
        <div className="movies-carousel" ref={carouselRef}>
          {movies.map((movie) => {
            const posterUrl = movie.posterpath
              ? `https://image.tmdb.org/t/p/w500${movie.posterpath}`
              : 'https://via.placeholder.com/500x750?text=Imagem+não+disponível';

            return (
              <div className="movie-card" key={movie.id}>
                <img
                  src={posterUrl}
                  alt={movie.originalTitle}
                  className="movie-poster"
                />
                
              </div>
            );
          })}
          
        </div>
        <button className="scroll-btn right" onClick={scrollRight}>&gt;</button> {/* Botão para rolar à direita */}

      </div>
      <h2 className='subtitulo'>Lancamentos Recentes</h2>
      <footer className='fimdapag'>
        <a className='info' href="https://github.com/joaofelippetrf/Imemdb">Github do Projeto</a>
        
      </footer>
    </div>
  );
};

export default MoviesList;
