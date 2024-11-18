package com.example.imedb.movieapp.activties;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.bumptech.glide.Glide;
import com.example.imedb.R;
import com.example.imedb.movieapp.entity.Movie;
import com.example.imedb.movieapp.interfac.ApiInterface;
import com.example.imedb.movieapp.client.Apiclient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MovieDetailsActivity extends AppCompatActivity {

    private EditText searchInput;
    private Button searchButton, resetButton;
    private ImageView moviePoster;
    private TextView movieTitle, movieGenre, movieReleaseDate, movieOverview, movieBudget;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_movie_details);


        searchInput = findViewById(R.id.searchInput);
        searchButton = findViewById(R.id.searchButton);
        resetButton = findViewById(R.id.resetButton);
        moviePoster = findViewById(R.id.moviePoster);
        movieTitle = findViewById(R.id.movieTitle);
        movieGenre = findViewById(R.id.movieGenre);
        movieReleaseDate = findViewById(R.id.movieReleaseDate);
        movieOverview = findViewById(R.id.movieOverview);
        movieBudget = findViewById(R.id.movieBudget);


        int movieId = getIntent().getIntExtra("MOVIE_ID", -1);
        if (movieId == -1) {
            Toast.makeText(this, "Erro ao carregar detalhes do filme", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }


        ApiInterface apiInterface = Apiclient.getRetrofitInstance().create(ApiInterface.class);
        Call<Movie> call = apiInterface.getMovieById(movieId);

        call.enqueue(new Callback<Movie>() {
            @Override
            public void onResponse(Call<Movie> call, Response<Movie> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Movie movie = response.body();
                    displayMovieDetails(movie);
                } else {
                    Toast.makeText(MovieDetailsActivity.this, "Erro ao carregar detalhes", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Movie> call, Throwable t) {
                Toast.makeText(MovieDetailsActivity.this, "Erro na API: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });

        // Lógica de funcionalidade do botão de busca
        searchButton.setOnClickListener(v -> {
            String query = searchInput.getText().toString();
            if (!query.isEmpty()) {

                Toast.makeText(MovieDetailsActivity.this, "Buscando: " + query, Toast.LENGTH_SHORT).show();

            }
        });

        resetButton.setOnClickListener(v -> {
            Intent homeIntent = new Intent(MovieDetailsActivity.this, MainActivity.class);
            startActivity(homeIntent);
        });
    }

    private void displayMovieDetails(Movie movie) {
        movieTitle.setText(movie.getOriginalTitle());
        movieGenre.setText("Genre: " + movie.getGenre());
        movieReleaseDate.setText("Release Date: " + movie.getReleaseDate());
        movieOverview.setText("Overview: " + movie.getOverview());
        movieBudget.setText("Budget: $" + movie.getBudget());

        String posterBaseUrl = "https://image.tmdb.org/t/p/w500";  // Alterar conforme a API que você usa
        String posterUrl = posterBaseUrl + movie.getPosterpath();


        Glide.with(this)
                .load(posterUrl)
                .into(moviePoster);
    }
}
