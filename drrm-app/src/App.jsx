import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Body from './components/Body.jsx';
import News from './components/News.jsx';
import NewsDetail from './components/NewsDetail.jsx';
import EventDetail from './components/EventDetails.jsx';
import Trainings from './components/Berts.jsx';
import Training2 from './components/Mci.jsx';
import Training3 from './components/SFATBLS.jsx';
import ELearning from './components/E-Learning.jsx';
import Shop from './components/Shop.jsx';
import Careers from './components/Careers.jsx';
import ManualDetail from './components/ManualDetail.jsx';
import OrderDetail from './components/OrderDetails.jsx';
import CartPage from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import Profile from './components/Profile.jsx';
import AdminLogin from './components/admin/AdminLoginForm.jsx';
import PrivateRoute from './components/admin/PrivateRoute.jsx';
import TermsCondition from './components/TermsCondition.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';

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
      <Route path="/events/:id" element={<PublicLayout><EventDetail /></PublicLayout>} />
      <Route path="/training1" element={<PublicLayout><Trainings /></PublicLayout>} />
      <Route path="/training2" element={<PublicLayout><Training2 /></PublicLayout>} />
      <Route path="/training3" element={<PublicLayout><Training3 /></PublicLayout>} />
      <Route path="/e-learning" element={<PublicLayout><ELearning /></PublicLayout>} />
      <Route path="/shop" element={<PublicLayout><Shop /></PublicLayout>} />
      <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />
      <Route path="/manual-detail" element={<PublicLayout><ManualDetail /></PublicLayout>} />
      <Route path="/terms-condition" element={<PublicLayout><TermsCondition /></PublicLayout>} />
      <Route path="/order/:orderId" element={<PublicLayout><OrderDetail /></PublicLayout>} />

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
