import { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '#capabilities', label: 'Why Nexa' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#process', label: 'How it works' },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#main-content" className={styles.brand}>
          <img
            src="/assets/nexa_logo.svg"
            alt="Nexa Manufacturing Unit India"
            width="150"
            height="36"
            className={styles.logo}
          />
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls="primary-nav"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
          <span className={styles.bar} aria-hidden="true" />
        </button>

        <nav
          id="primary-nav"
          aria-label="Primary"
          className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}
        >
          <ul className={styles.list}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={label}>
                <a href={href} className={styles.link} onClick={closeMenu}>{label}</a>
              </li>
            ))}
          </ul>
          <a href="#register" className={styles.cta} onClick={closeMenu}>Enquire</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
