package com.projeto.proje.service;

import com.projeto.proje.entidades.Movie;
import com.projeto.proje.entidades.repositorios.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Movie createMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public Optional<Movie> findById(Integer id) {
        return movieRepository.findById(id);
    }
}
    