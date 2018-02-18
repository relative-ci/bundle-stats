import styles from './styles.css';

const Logo = () => (
  <h1
    class={styles.root}
    title="Mas o Menos"
  >
    <a
      href="https://github.com/mas-o-menos/compare"
      target="_blank"
      rel="noopener noreferrer"
      class={styles.link}
    >
      <span class={styles.icon} />
      <span class={styles.text}>
        mas-o-menos
      </span>
    </a>
  </h1>
);

export default Logo;
