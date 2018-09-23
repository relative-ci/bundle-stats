import styles from './styles.css';

const Logo = () => (
  <h1
    class={styles.root}
    title="Relative CI"
  >
    <a
      href="https://github.com/relative-ci/compare"
      target="_blank"
      rel="noopener noreferrer"
      class={styles.link}
    >
      <span class={styles.icon} />
      <span class={styles.text}>
        Relative CI
      </span>
    </a>
  </h1>
);

export default Logo;
