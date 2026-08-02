import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Designer from '../components/Designer';
import ProductGrid from '../features/products/ProductGrid';
import Testimonials from '../components/Testimonials';
import Contacts from '../components/Contacts';
import Newsletter from '../components/Newsletter';

const Home: React.FC = () => (
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

export default Home;
