import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoviesList from './paginas/movies'; // Your original component
import SearchResults from './paginas/search'; // The new search results component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </Router>
  );
};

export default App;
