import Nav from './components/Nav';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Projects />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
