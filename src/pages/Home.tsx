import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Designer from '../components/Designer';
import ProductGrid from '../features/products/ProductGrid';
import Testimonials from '../components/Testimonials';
import Contacts from '../components/Contacts';
import Newsletter from '../components/Newsletter';

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element =
        document.getElementById(targetId) ||
        document.querySelector(`[data-section="${targetId}"]`);
      if (element) {
        setTimeout(() => {
          const navHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: elementPosition - navHeight, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <main>
      <Hero />
      <About />
      <Designer />
      <ProductGrid />
      <Testimonials />
      <Contacts />
      <Newsletter />
    </main>
  );
};

export default Home;
