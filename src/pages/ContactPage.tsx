import React, { useEffect } from 'react';
import Contacts from '../components/Contacts';

const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20 min-h-screen bg-[#020617] text-white">
      <Contacts />
    </main>
  );
};

export default ContactPage;
