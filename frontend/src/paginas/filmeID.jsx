import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para capturar o id da URL
import axios from 'axios';
import Header from './header.jsx'; 
import Footer from './footer.jsx';

const MovieDetails = () => {
  const { id } = useParams(); // Pega o id do filme a partir da URL
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/Movies/${id}`); // Faz o fetch com o ID do filme
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

  return (
    <div>
        <Header />    

        <div className="movie-details">
            <img
                src={movie.posterpath ? `https://image.tmdb.org/t/p/w500${movie.posterpath}` : 'https://via.placeholder.com/500x750?text=Imagem+não+disponível'}
                alt={movie.originalTitle}
                />
            <div className="movie-info">
                <h1 className='titulo'>{movie.originalTitle}</h1>
                <p strong className='subtitulo'><strong className='subtitulo'>Budget:</strong> {movie.budget}$</p>
                <p className='subtitulo'><strong>Data de lançamento:</strong> {movie.releaseDate}</p>
                <p className='subtitulo'><strong className='subtitulo'>Sinopse:</strong> {movie.overview}</p>
                {/* Outros detalhes do filme */}
            </div>
        </div>
    <Footer />
    </div>

  );
};

export default MovieDetails;
