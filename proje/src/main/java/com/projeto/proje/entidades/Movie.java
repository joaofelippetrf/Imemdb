    package com.projeto.proje.entidades;

    import jakarta.persistence.Entity;
    import jakarta.persistence.FetchType;
    import jakarta.persistence.GeneratedValue;
    import jakarta.persistence.GenerationType;
    import jakarta.persistence.Id;
    import jakarta.persistence.Column;
    import jakarta.persistence.OneToMany;
    import jakarta.persistence.Table;
    import java.time.LocalDate;
    import java.util.List;

    @Entity
    @Table(name = "movie")
    public class Movie {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Integer id;


        @Column(length = 65535) // Ajuste conforme necessário
        private String overview;

        private String posterpath;

        public String getPosterpath() {
            return posterpath;
        }

        public void setPosterpath(String posterpath) {
            this.posterpath = posterpath;
        }


        private String homepage;

        private int budget;

        private int runtime;

        @Column(name = "release_date")
        private LocalDate releaseDate;

        @Column(name = "vote_average")
        private double voteAverage;

        @Column(name = "vote_count")
        private int voteCount;

        private boolean adult;

        private double popularity;

        private String genre;
        
        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getOverview() {
            return overview;
        }

        public void setOverview(String overview) {
            this.overview = overview;
        }

        public String getHomepage() {
            return homepage;
        }

        public void setHomepage(String homepage) {
            this.homepage = homepage;
        }

        public int getBudget() {
            return budget;
        }

        public void setBudget(int budget) {
            this.budget = budget;
        }

        public int getRuntime() {
            return runtime;
        }

        public void setRuntime(int runtime) {
            this.runtime = runtime;
        }

        public LocalDate getReleaseDate() {
            return releaseDate;
        }

        public void setReleaseDate(LocalDate releaseDate) {
            this.releaseDate = releaseDate;
        }

        public double getVoteAverage() {
            return voteAverage;
        }

        public void setVoteAverage(double voteAverage) {
            this.voteAverage = voteAverage;
        }

        public int getVoteCount() {
            return voteCount;
        }

        public void setVoteCount(int voteCount) {
            this.voteCount = voteCount;
        }

        public boolean isAdult() {
            return adult;
        }

        public void setAdult(boolean adult) {
            this.adult = adult;
        }

        public double getPopularity() {
            return popularity;
        }

        public void setPopularity(double popularity) {
            this.popularity = popularity;
        }

        public String getGenre() {
            return genre;
        }

        public void setGenre(String genre) {
            this.genre = genre;
        }

        
        String originalTitle;
        public String getOriginalTitle() {
            return originalTitle;
        }

        public void setOriginalTitle(String originalTitle) {
            this.originalTitle = originalTitle;
        }
    

    
    }
