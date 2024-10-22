import './App.css'
import './paginas/movies'
import MoviesList from './paginas/movies'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetails from './paginas/filmeID'
function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies/:id" element={<MovieDetails />} /> {/* Rota de detalhes */}
      </Routes>
    </Router>
  );
};

export default App;
