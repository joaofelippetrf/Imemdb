import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  // Fazer a requisição para a API assim que o componente for montado
  useEffect(() => {
    axios.get('http://localhost:8081/Movies/all') // URL da sua API Spring
      .then(response => {
        setMovies(response.data); // Salva os filmes retornados no estado
      })
      .catch(error => {
        console.error('Erro ao buscar filmes:', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center">Lista de Filmes</h1>
      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-4" key={movie.id}>
            <div className="card mb-4">
              <img
                src={movie.posterPath} // Aqui você utiliza o campo 'posterPath'
                className="card-img-top"
                alt={movie.originalTitle}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.originalTitle}</h5>
                <p className="card-text">{movie.overview}</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>Gênero:</strong> {movie.genre}</li>
                  <li className="list-group-item"><strong>Duração:</strong> {movie.runtime} minutos</li>
                  <li className="list-group-item"><strong>Data de Lançamento:</strong> {movie.releaseDate}</li>
                  <li className="list-group-item"><strong>Orçamento:</strong> ${movie.budget}</li>
                  <li className="list-group-item"><strong>Popularidade:</strong> {movie.popularity}</li>
                  <li className="list-group-item"><strong>Classificação:</strong> {movie.voteAverage} ({movie.voteCount} votos)</li>
                  <li className="list-group-item"><strong>Adulto:</strong> {movie.adult ? 'Sim' : 'Não'}</li>
                </ul>
                <a href={movie.homepage} className="btn btn-primary mt-2" target="_blank" rel="noreferrer">
                  Homepage
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
