package com.projeto.proje.service;

import com.projeto.proje.entidades.Movie;
import com.projeto.proje.entidades.repositorios.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Movie createMovie(Movie movie) {
        // Salva o filme no banco de dados e retorna o objeto salvo
        return movieRepository.save(movie);
    }
    
}
