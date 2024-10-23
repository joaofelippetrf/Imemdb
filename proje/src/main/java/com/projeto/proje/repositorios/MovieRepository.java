package com.projeto.proje.repositorios;

import com.projeto.proje.entidades.Movie;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends CrudRepository<Movie, Integer> {
    Iterable<Movie> findByOriginalTitle(String originalTitle);

    Iterable<Movie> findByGenre(String genre); 
    
    @Query("SELECT m FROM Movie m ORDER BY m.voteCount DESC")
    List<Movie> findTop100ByVoteCount();    

    List<Movie> findByOriginalTitleContainingIgnoreCase(String query);    

    @Query("SELECT m FROM Movie m ORDER BY m.releaseDate DESC")
    List<Movie> findRecentMovies(Pageable pageable);

    @Query("SELECT m FROM Movie m ORDER BY m.releaseDate DESC")
    List<Movie> findTop40ByOrderByReleaseDateDesc();
}


