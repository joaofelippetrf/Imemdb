package com.projeto.proje.controlle;

import com.projeto.proje.entidades.Movie;
import com.projeto.proje.entidades.repositorios.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/Movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @PostMapping(path="/create")
    public Movie createMovie(
        @RequestParam String originalTitle,
        @RequestParam String overview,
        @RequestParam String homepage,
        @RequestParam int budget,
        @RequestParam int revenue,
        @RequestParam int runtime,
        @RequestParam String releaseDate,
        @RequestParam double voteAverage,
        @RequestParam int voteCount
    ) {
        // Cria uma nova instância de Movie
        Movie movie = new Movie();
        movie.setOriginalTitle(originalTitle);
        movie.setOverview(overview);
        movie.setHomepage(homepage);
        movie.setBudget(budget);
        movie.setRevenue(revenue);
        movie.setRuntime(runtime);
        movie.setReleaseDate(releaseDate);
        movie.setVoteAverage(voteAverage);
        movie.setVoteCount(voteCount);
        
        // Salva o objeto Movie no banco de dados
        return movieRepository.save(movie);
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
