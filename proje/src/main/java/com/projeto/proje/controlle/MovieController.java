package com.projeto.proje.controlle;

import com.projeto.proje.entidades.Movie;
import com.projeto.proje.entidades.repositorios.MovieRepository;
import com.projeto.proje.service.MovieService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping(path="/Movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private MovieService movieService;

    @PostMapping(path="/create")
    public ResponseEntity<?> createMovie(@RequestBody Movie movie) {
        try {
            Movie savedMovie = movieService.createMovie(movie);
            return new ResponseEntity<>(savedMovie, HttpStatus.CREATED);
        } catch (Exception e) {
            
            e.printStackTrace();
            return new ResponseEntity<>("Error creating movie: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(path="/{Id}")
        public Optional<Movie> searchMovieById(@PathVariable("Id") Integer Id) {
            return movieService.findById(Id);
    }
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    
    @GetMapping(path="/all")
    public Iterable<Movie> getAllMovies(){
        return movieRepository.findAll();
    }
    
    @GetMapping(path="/search/title/{originalTitle}")
    public Iterable<Movie> searchMovieByOriginalTitle(@PathVariable("originalTitle") String originalTitle) {
        return movieRepository.findByOriginalTitle(originalTitle);
    }

    @GetMapping(path="/search/genre/{genre}")
    public Iterable<Movie> searchByGener(@PathVariable("genre") String genre){
        return movieRepository.findByGenre(genre);
    }
}

