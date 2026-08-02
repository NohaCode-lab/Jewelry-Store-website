import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Navbar } from '../components/layout/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

import Home from '../pages/Home';
import AboutPage from '../pages/AboutPage';
import DesignerPage from '../pages/DesignerPage';
import CollectionsPage from '../pages/CollectionsPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';

import { AuthProvider } from '../features/auth/AuthProvider';
import { CartDrawer } from '../features/cart/CartDrawer';
import { WishlistDrawer } from '../features/wishlist/WishlistDrawer';
import { SearchModal } from '../features/search/SearchModal';
import { ProductModal } from '../features/products/ProductModal';
import { CheckoutModal } from '../features/checkout/CheckoutModal';
import { AIConciergeModal } from '../features/ai/AIConciergeModal';
import { useUIStore } from '../stores/uiStore';

export const App: React.FC = () => {
  const { activeCustomizingProduct, setCustomizingProduct } = useUIStore();

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="bg-[#020617] text-white min-h-screen font-sans selection:bg-amber-500 selection:text-black">
          {/* Toast Notifications */}
          <Toaster position="bottom-right" theme="dark" richColors closeButton />

          {/* Header Navigation */}
          <Navbar />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/designer" element={<DesignerPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/shop" element={<CollectionsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {/* Global Modals & Drawers */}
          <CartDrawer />
          <WishlistDrawer />
          <SearchModal />
          <CheckoutModal />
          <AIConciergeModal />
          <ProductModal product={activeCustomizingProduct} onClose={() => setCustomizingProduct(null)} />

          {/* Footer & BackToTop */}
          <Footer />
          <BackToTop />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
