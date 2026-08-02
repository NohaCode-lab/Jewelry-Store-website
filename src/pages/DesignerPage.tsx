import React, { useEffect } from 'react';
import Designer from '../components/Designer';

const DesignerPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20 min-h-screen bg-[#020617] text-white">
      <Designer />
    </main>
  );
};

export default DesignerPage;
