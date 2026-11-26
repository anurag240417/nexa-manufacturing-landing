import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import CapabilityCards from './components/CapabilityCards/CapabilityCards';
import ProcessSteps from './components/ProcessSteps/ProcessSteps';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <CapabilityCards />
        <ProcessSteps />
        <RegistrationForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
