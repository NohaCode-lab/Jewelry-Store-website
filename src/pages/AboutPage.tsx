import React, { useEffect } from 'react';
import About from '../components/About';

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20 min-h-screen bg-[#020617] text-white">
      <About />
    </main>
  );
};

export default AboutPage;
