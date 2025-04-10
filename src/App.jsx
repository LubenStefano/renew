import './App.css';
import CreateOffer from './components/pages/CreateOffer/CreateOffer';
import Details from './components/pages/Details/Details';
import EditOffer from './components/pages/EditOffer/EditOffer';
import Login from './components/pages/Login/Login';
import Profile from './components/pages/Profile/Profile';
import Register from './components/pages/Register/Register';
import Footer from './components/shared/Footer/Footer';
import Navbar from './components/shared/Navbar/Navbar';
import EditProfile from './components/pages/EditProfile/EditProfile';
import Offers from './components/pages/Offers/Offers';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout/Layout';
import { UserProvider } from './context/UserContext';
import '@ant-design/v5-patch-for-react-19';
import Main from './components/pages/Main/Main';
import AuthGuard from './Guards/AuthGuard';
import AlreadyLoggedInGuard from './Guards/AlreadyLoggedInGuard';
import SavedOffers from './components/pages/SavedOffers/SavedOffers';
import NotFound from './components/pages/NotFound/NotFound';
import Location from './components/pages/Location/Location';

function App() {
  return (
    <Layout>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/offers/:category" element={<Offers />} />
        <Route path="/offers/details/:id" element={<Details />} />
        <Route path="/location" element={<Location />} />

        <Route element={<AuthGuard />}>
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/offers/create" element={<CreateOffer />} />
          <Route path="/offers/edit/:id" element={<EditOffer />} />
          <Route path="/profile/edit/" element={<EditProfile />} />
          <Route path="/savedOffers/:userId" element={<SavedOffers />} />
        </Route>

        <Route element={<AlreadyLoggedInGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Layout>
  );
}

export default function Root() {
  return (
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  );
}
