import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';  
import Header from './components/Header.jsx';
import Body from './components/Body.jsx';
import News from './components/News.jsx';
import Trainings from './components/Berts.jsx';
import Training2 from './components/Mci.jsx';
import ELearning from './components/E-Learning.jsx';
import Shop from './components/Shop.jsx';
import Footer from './components/Footer.jsx';
// import { CartProvider } from "./firebase/CartContext.js";  // Make sure this path is correct
// import Cart from "./components/Cart";  // Ensure the correct path

function App() {
  return (
      <>
      <Header />
            <Routes>
              <Route path="/" element={<Body />} />
              <Route path="/news" element={<News />} />
              <Route path="/training1" element={<Trainings />} />
              <Route path="/training2" element={<Training2 />} />
              <Route path="/e-learning" element={<ELearning />} /> 
              <Route path="/shop" element={<Shop />} /> 
              {/* <Route path="/cart" element={<Cart />} /> */}
            </Routes>
            <Footer />
      </>
  );
}

export default App;
