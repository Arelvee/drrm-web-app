import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Body from './components/Body.jsx';
import News from './components/News.jsx';
import NewsDetail from './components/NewsDetail.jsx';
import Trainings from './components/Berts.jsx';
import Training2 from './components/Mci.jsx';
import ELearning from './components/E-Learning.jsx';
import Shop from './components/Shop.jsx';
import CartPage from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import Profile from './components/Profile.jsx';
import AdminLogin from './components/admin/AdminLoginForm.jsx';
import PrivateRoute from './components/admin/PrivateRoute.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import MyPurchase from './components/Profile.jsx';

// Public Layout
const PublicLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <Routes>
      {/* Public Routes Using PublicLayout */}
      <Route path="/" element={<PublicLayout><Body /></PublicLayout>} />
      <Route path="/cart" element={<PublicLayout><CartPage /></PublicLayout>} />
      <Route path="/profile" element={<PublicLayout><Profile /></PublicLayout>} />
      <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />
      <Route path="/news" element={<PublicLayout><News /></PublicLayout>} />
      <Route path="/news/:id" element={<PublicLayout><NewsDetail /></PublicLayout>} />
      <Route path="/training1" element={<PublicLayout><Trainings /></PublicLayout>} />
      <Route path="/training2" element={<PublicLayout><Training2 /></PublicLayout>} />
      <Route path="/e-learning" element={<PublicLayout><ELearning /></PublicLayout>} />
      <Route path="/shop" element={<PublicLayout><Shop /></PublicLayout>} />

      {/* Admin Routes (No Header/Footer) */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin/*" element={
        <PrivateRoute>
          <AdminLayout />
        </PrivateRoute>
      } />
    </Routes>
  );
}

export default App;
