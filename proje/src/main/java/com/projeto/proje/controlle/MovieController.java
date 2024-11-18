package com.projeto.proje.controlle;

import com.projeto.proje.entidades.Movie;
import com.projeto.proje.repositorios.MovieRepository;
import com.projeto.proje.service.MovieService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping(path = "/{id}")
    public ResponseEntity<Movie> searchMovieById(@PathVariable("id") Integer id) {
        Optional<Movie> movie = movieService.findById(id);
        return movie.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
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

    @GetMapping("/top100")
    public ResponseEntity<List<Movie>> getTop100Movies() {
        List<Movie> movies = movieService.getTop100Movies();
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/busca")
    public ResponseEntity<List<Movie>> searchMovies(@RequestParam("query") String query) {
        if (query == null || query.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        List<Movie> movies = movieService.searchMovies(query);
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/recent")
    public List<Movie> getRecentMovies() {
        return movieService.getRecentMovies();
    }

}
