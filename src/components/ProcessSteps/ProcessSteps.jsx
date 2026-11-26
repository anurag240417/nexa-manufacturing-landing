import styles from './ProcessSteps.module.css';

const STEPS = [
  { title: 'Share your requirement', text: 'Tell us the product type, quantities and timing.' },
  { title: 'Discuss a suitable approach', text: 'Our team outlines the next conversation and scope.' },
  { title: 'Plan the next steps', text: 'Receive a clear follow-up process.' },
];

function ProcessSteps() {
  return (
    <section id="process" className={styles.section} aria-labelledby="process-title">
      <div className={styles.inner}>
        <h2 id="process-title" className={styles.title}>How it works</h2>
        <ol className={styles.list}>
          {STEPS.map(({ title, text }, index) => (
            <li key={title} className={styles.step}>
              <h3 className={styles.stepTitle}>
                <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                {' '}
                {title}
              </h3>
              <p className={styles.stepText}>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default ProcessSteps;
