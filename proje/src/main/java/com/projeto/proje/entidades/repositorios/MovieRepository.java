package com.projeto.proje.entidades.repositorios;

import com.projeto.proje.entidades.Movie;  // Certifique-se de que este é o caminho correto da sua entidade
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends CrudRepository<Movie, Integer> {
    Iterable<Movie> findByOriginalTitle(String originalTitle);
}
