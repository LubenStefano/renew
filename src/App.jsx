import './App.css'
import CreateOffer from './components/pages/CreateOffer/CreateOffer'
import Details from './components/pages/Details/Details'
import EditOffer from './components/pages/EditOffer/EditOffer'
import Login from './components/pages/Login/Login'
import Main from './components/pages/main/Main'
import Products from './components/pages/Products/Products'
import Profile from './components/pages/Profile/Profile'
import Register from './components/pages/Register/Register'
import Footer from './components/shared/Footer/Footer'
import Navbar from './components/shared/Navbar/Navbar'
import EditProfile from './components/pages/EditProfile/EditProfile'
import { BrowserRouter, Routes, Route, Link } from 'react-router'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/profile" element={< Profile />} />
        <Route path="/create" element={< CreateOffer />} />
        <Route path="/offer/edit/:id" element={< EditOffer />} />
        <Route path="/profile/edit/:id" element={< EditProfile />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
