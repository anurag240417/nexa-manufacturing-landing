import styles from './CapabilityCards.module.css';

const CAPABILITIES = [
  {
    title: 'Process precision',
    text: 'Documented checkpoints and quality-led review.',
    icon: '/assets/precision_icon.svg',
  },
  {
    title: 'Delivery planning',
    text: 'Clear expectations for lead times and handovers.',
    icon: '/assets/delivery_icon.svg',
  },
  {
    title: 'Collaborative support',
    text: 'A helpful first conversation through every request.',
    icon: '/assets/support_icon.svg',
  },
];

function CapabilityCards() {
  return (
    <section id="capabilities" className={styles.section} aria-labelledby="capabilities-title">
      <div className={styles.inner}>
        <header className={styles.head}>
          <h2 id="capabilities-title" className={styles.title}>What we bring to the table</h2>
          <p className={styles.subtitle}>
            Capabilities designed around real operational requirements.
          </p>
        </header>
        <ul className={styles.grid}>
          {CAPABILITIES.map(({ title, text, icon }) => (
            <li key={title} className={styles.card}>
              <article>
                <img
                  src={icon}
                  alt=""
                  width="72"
                  height="72"
                  decoding="async"
                  className={styles.icon}
                />
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardText}>{text}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default CapabilityCards;
