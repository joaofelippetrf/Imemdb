import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import './App.css';
import MoviesList from './paginas/movies'; // Ensure this path is correct
import MovieDetails from './paginas/filmeID'; // Import MovieDetails component
import SearchResults from './paginas/search'; // Import SearchResults component
import TopMovies from './paginas/Top100'; // Import TopMovies component


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies/:id" element={<MovieDetails />} /> {/* Route for movie details */}
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/top-movies" element={<TopMovies />} /> {/* Use element instead of component */}
      </Routes>
    </Router>
  );
}

export default App;
