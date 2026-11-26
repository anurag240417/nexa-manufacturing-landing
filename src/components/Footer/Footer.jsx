import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.text}>
          <small>
            <span>© 2026 Nexa Manufacturing Unit India</span>
            <span className={styles.divider} aria-hidden="true">|</span>
            <span className={styles.secondary}>Product enquiries and information</span>
          </small>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
