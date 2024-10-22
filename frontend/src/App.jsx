import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components
import './App.css';
import MoviesList from './paginas/movies'; // Ensure this path is correct
import MovieDetails from './paginas/filmeID'; // Import MovieDetails component
import SearchResults from './paginas/search.jsx'; // Import SearchResults component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies/:id" element={<MovieDetails />} /> {/* Rota de detalhes */}
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
