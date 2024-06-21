import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/LogIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import PageNotFound from './components/PageNotFound';
import HeaderNavbar from './components/HeaderNavbar';
import Admin from './components/Admin/Admin'
import AddProduct from './components/Admin/AddProduct';
import ViewProducts from './components/Admin/ViewProducts';
// import ViewUser from './components/Admin/ViewUser';
import Products from './components/Admin/Products';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import CheckoutDetails from './components/CheckoutDetails';
import Checkout from './components/Admin/Checkout';
import CheckoutSuccess from './components/CheckoutSuccess';
import OrderHistory from './components/OrderHistory';
import Orders from './components/Admin/Orders';
import OrderDetails from './components/Admin/OrderDetails';

function App() {
  return (
  <>
  <ToastContainer autoClose={500}/>
  <HeaderNavbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/admin' element={<Admin/>}>
        <Route path='addproduct' element={<AddProduct/>}/>
        <Route path='viewproduct' element={<ViewProducts/>}/>
        <Route path='editproduct/:id' element={<AddProduct/>}/>
        {/* <Route path='viewuser' element={<ViewUser/>}/> */}
        <Route path='orders' element={<Orders/>}/>
        <Route path='order-details/:id/:orderStatus' element={<OrderDetails/>}/>
      </Route>
      <Route path='/products' element={<Products/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/details/:id' element={<ProductDetails/>}/>
      <Route path='/checkout-details' element={<CheckoutDetails/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/checkout-success' element={<CheckoutSuccess/>}/>
      <Route path='/order-history' element={<OrderHistory/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  </>
  );
}

export default App;
