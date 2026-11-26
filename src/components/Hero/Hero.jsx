import styles from './Hero.module.css';

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>NEXA MANUFACTURING UNIT INDIA</p>
          <h1 id="hero-title" className={styles.title}>
            Precision manufacturing, made more approachable.
          </h1>
          <p className={styles.lead}>
            Explore practical components and request a conversation about your next
            production need.
          </p>
          <a href="#register" className={styles.cta}>Register interest</a>
        </div>

        <figure className={styles.media}>
          <img
            src="/assets/manufacturing_hero.svg"
            alt="Illustration of a manufacturing site with process planning charts"
            width="900"
            height="650"
            className={styles.image}
          />
        </figure>

        <p className={styles.support}>
          Reliable processes • Clear timelines • Local expertise
        </p>
      </div>
    </section>
  );
}

export default Hero;
