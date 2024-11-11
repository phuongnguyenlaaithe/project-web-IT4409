import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Collection from './pages/Collection'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Order from './pages/Order'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Favourite from './pages/Favourite'
import ChatBox from './components/chat'
import SearchBar from './components/SearchBar'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/favourite" element={<Favourite />} />
      </Routes>
      <ChatBox />
      <Footer />
    </div>
  )
}

export default App
