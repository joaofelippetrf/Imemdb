import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/src/assets/logo.png'; // Ensure the path is correct

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    navigate(`/search-results?query=${searchQuery}`);
  };

  return (
    <header>
      <img className="logoime" src={logo} alt="Logo IMEdb" />
      <input
        type="text"
        placeholder="Pesquisar..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Pesquisar</button>
      <h1>IMEdb</h1>
      <nav>
        <a href="/" className='info'>Início</a>
        <a href="/genero" className='info'>Gênero</a>
        <a href="/top-movies" className='info'>Top 100 Filmes</a>
      </nav>
    </header>
  );
};

export default Header;
