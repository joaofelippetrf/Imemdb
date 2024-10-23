package com.projeto.proje.service;

import com.projeto.proje.entidades.Movie;
import com.projeto.proje.repositorios.MovieRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
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

    public List<Movie> getTop100Movies() {
        return movieRepository.findTop100ByVoteCount();
    }
    public List<Movie> searchMovies(String query) {
        return movieRepository.findByOriginalTitleContainingIgnoreCase(query);
    }
    public List<Movie> getRecentMovies() {
        return movieRepository.findTop40ByOrderByReleaseDateDesc();
    }
    
}
    