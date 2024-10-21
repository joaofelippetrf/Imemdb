import styles from '../styles/MovieGrid.module.css';

export default function MovieGrid() {
  const movies = [
    { id: 1, title: 'Oppenheimer', imageUrl: '/images/Oppenheimer.jpeg' },
    { id: 2, title: 'Barbie', imageUrl: '/images/barbie.jpeg' },
    { id: 3, title: 'Mission Impossible', imageUrl: '/images/mi.jpg' },
    { id: 4, title: 'The Marvels', imageUrl: '/images/marvels.jpg' },
    { id: 5, title: 'Coringa 2', imageUrl: '/images/marvels.jpg' },
    { id: 6, title: 'Velozes e Furioso 37', imageUrl: '/images/marvels.jpg' },
    
  ];

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <div key={movie.id} className={styles.card}>
          <img src={movie.imageUrl} alt={movie.title} className={styles.image} />
          <h3 className={styles.title}>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
}
