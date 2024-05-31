import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from './components/MenuPage';
import Cart from './components/Cart';
import CheckoutPage from './components/CheckoutPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
