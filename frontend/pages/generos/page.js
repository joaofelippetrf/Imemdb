"use client";
import Navbar from './components/Navbar';
import MovieGrid from './components/MovieGrid';
import styles from './styles/Home.module.css';

export default function Generos() {
  return (
    <div>
      <Navbar />
      <div className={styles.banner}>
        <img src="banner" alt="Banner" className={styles.bannerImage} />
      </div>
      <section className={styles.popularSection}>
        <h2>Dramas</h2>
        <MovieGrid />
      </section>

      <section className={styles.popularSection}>
        <h2>250 Melhores Filmes</h2>
        <MovieGrid />
      </section>

      <section className={styles.popularSection}>
        <h2>Principais Bilheterias</h2>
        <MovieGrid />
      </section>

    </div>
  );
}
