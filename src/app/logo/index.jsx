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
      <svg
        class={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        enable-background="new 0 0 256 256"
      >
        <path fill="currentColor" d="M108.4 178.2l-20.5-14.8 19.5-27.4-32-10.5 7.2-23.8 32.5 10.5V77.8h25.1v34.3l32.5-10.5 7.9 23.8-32.8 10.5 19.5 27.4-20.5 14.8-19.2-27.6-19.2 27.7z" />
      </svg>
      <span class={styles.text}>
        mas-o-menos
      </span>
    </a>
  </h1>
);

export default Logo;
