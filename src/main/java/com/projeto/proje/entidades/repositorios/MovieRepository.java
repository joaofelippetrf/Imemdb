package com.projeto.proje.entidades.repositorios;

import com.projeto.proje.entidades.Movie;
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
}
