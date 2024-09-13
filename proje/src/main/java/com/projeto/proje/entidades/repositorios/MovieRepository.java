package com.projeto.proje.entidades.repositorios;

import com.projeto.proje.entidades.Movie;  
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends CrudRepository<Movie, Integer> {
    Iterable<Movie> findByOriginalTitle(String originalTitle);

    Iterable<Movie> findByGenre(String genre); 
    
        
    
}
