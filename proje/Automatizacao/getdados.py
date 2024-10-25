import requests
import time

# Chave de API do TMDb
API_KEY = "d4b5f7b27fc5277cd9b05cc1072ad00d"
TMDB_BASE_URL = "https://api.themoviedb.org/3/movie/"
LOCAL_API_URL = "http://localhost:8081/Movies/create"

# Função para buscar dados de um filme pelo ID
def get_movie_data(movie_id):
    url = f"{TMDB_BASE_URL}{movie_id}?api_key={API_KEY}"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        # Extrair os campos desejados para enviar ao servidor local
        movie_data = {
            "originalTitle": data.get("original_title"),
            "overview": data.get("overview"),
            "homepage": data.get("homepage"),
            "budget": data.get("budget"),
            "runtime": data.get("runtime"),
            "releaseDate": data.get("release_date"),
            "voteAverage": data.get("vote_average"),
            "voteCount": data.get("vote_count"),
            "adult": data.get("adult"),
            "popularity": data.get("popularity"),
            "genre": data["genres"][0]["name"] if data.get("genres") else None,
            "posterpath": data.get("poster_path"),
            
        }
        return movie_data
    else:
        print(f"Failed to get data for movie ID {movie_id}")
        return None

# Função para enviar os dados para a API local
def post_movie_data(movie_data):
    response = requests.post(LOCAL_API_URL, json=movie_data)
    if response.status_code == 201:
        print(f"Successfully created movie: {movie_data['originalTitle']}")
    else:
        print(f"Failed to create movie: {movie_data['originalTitle']} - Status code: {response.status_code}")

# Loop para buscar dados para múltiplos filmes e enviá-los à API local
def fetch_and_post_movies(start_id, end_id):
    for movie_id in range(start_id, end_id + 1):
        movie_data = get_movie_data(movie_id)
        if movie_data:
            post_movie_data(movie_data)
        time.sleep(0.05)  # Adicionar um pequeno atraso para evitar limite de taxa da API

# Coletar e enviar dados dos filmes do ID 1 até 550
fetch_and_post_movies(2000, 10000)
