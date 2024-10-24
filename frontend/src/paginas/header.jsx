
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/src/assets/logo.png'; 

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
      <a href="/" className='info'>Inicio</a>
      <a href="/genero" className='info'>Genero</a>
      <a href="/top-100" className='info'>Top 100 Filmes</a>
    </header>
  );
};

export default Header;
