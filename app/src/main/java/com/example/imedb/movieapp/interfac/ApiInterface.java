package com.example.imedb.movieapp.interfac;

import com.example.imedb.movieapp.entity.Movie;
import retrofit2.http.Path;  // Add this import for Retrofit's @Path
import retrofit2.http.Query;
import retrofit2.Call;
import retrofit2.http.GET;
import java.util.List;

public interface ApiInterface {

    @GET("Movies/all")
    Call<List<Movie>> getMovies();

    @GET("Movies/busca")
    Call<List<Movie>> searchMovies(@Query("query") String query);

    @GET("Movies/{id}")
    Call<Movie> getMovieById(@Path("id") int id);
}
