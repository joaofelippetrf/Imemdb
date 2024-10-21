import styles from '../styles/Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className={styles.titulo}>
      <div className={styles.logo}>
        <h2>IMEdb</h2>
      </div>
      <div className={styles.navbar}>
      <Link href="/generos">
          <nav className={styles.nav}> Início</nav>
        </Link>
        <nav className={styles.nav}> Gêneros</nav>
        <nav className={styles.nav}> Contato</nav>

      </div>
      <div className={styles.search}>
        <input type="text" placeholder="Search..." />
      </div>
    </nav>
  );
}
