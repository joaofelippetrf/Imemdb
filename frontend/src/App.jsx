import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import MoviesList from './paginas/movies'; 
import MovieDetails from './paginas/filmeID'; 
import SearchResults from './paginas/search.jsx'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies/:id" element={<MovieDetails />} /> 
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
