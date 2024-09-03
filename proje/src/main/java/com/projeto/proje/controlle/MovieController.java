package com.projeto.proje.controlle;

import com.projeto.proje.entidades.Movie;
import com.projeto.proje.entidades.repositorios.MovieRepository;
import com.projeto.proje.service.MovieService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/Movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private MovieService movieService;

    @GetMapping(path="/create")
    public Movie createMovie(@RequestBody Movie movie) {
        return movieService.createMovie(movie);
    }

    @GetMapping(path="/all")
    public Iterable<Movie> getAllMovies(){
        return movieRepository.findAll();
    }
    
    @GetMapping(path="/search/{originalTitle}")
    public Iterable<Movie> searchMovieByOriginalTitle(@PathVariable("originalTitle") String originalTitle) {
        return movieRepository.findByOriginalTitle(originalTitle);
    }
}

