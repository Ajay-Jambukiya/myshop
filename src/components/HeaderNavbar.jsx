import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap';
import { FaHome, FaPenNib, FaSearch, FaUserAlt } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser, LogoutUser, selectUserName, selectUserRole } from '../store/slice/authSlice';
import { toast } from 'react-toastify';
import { ShowOnLogin, ShowOnLogout } from './HiddenLinks';
import { doc, getDoc } from 'firebase/firestore';
import { selectCartItems } from '../store/slice/cartSlice';
import useFetchCollection from '../customehooks/useFetchCollection';
import productSlice, { selectProducts, store_product } from '../store/slice/ProductSlice';
import { FILTER_BY_SEARCH } from '../store/slice/filterSlice';


const HeaderNavbar = () => {
    const [search,setSearch]=useState(null)

    // for search the product
    let {data,isLoading}=useFetchCollection("products")
    let dispatch=useDispatch()
    let products=useSelector(selectProducts)
    useEffect(()=>{
        dispatch(store_product({products:data}))
    },[data,dispatch])
     
    const cartItems=useSelector(selectCartItems)
    // const dispatch = useDispatch()
    const userrole = useSelector(selectUserRole)
    const userName = useSelector(selectUserName) 
    const navigate = useNavigate()
    
    useEffect(()=>{
        onAuthStateChanged(auth, async(user) => {
            if (user) {
              const uid = user.uid; 
              const ref = doc(db,"users",uid)
            const docSanp = await getDoc(ref)  
            if(docSanp.exists()){
                let role = docSanp.data().role
                let userName1 = user.email.slice(0,-10)
            //   setUsername(userName1)
              dispatch(LoginUser({email:user.email,userId:uid,userName:userName1,role:role}))
            }
              
            } else {
                dispatch(LogoutUser())
            }
          });
    },[dispatch])

    let handleLogout=()=>{
            signOut(auth).then(() => {
                toast.success("Logout successfully")
                navigate('/')
            }).catch((error) => {
                toast.error(error.message)
            });
    }

    // for search the product
    // useEffect(()=>{
    //     dispatch(FILTER_BY_SEARCH({search,products}))
    // },[search,dispatch,products])

    let handleSearch=(e)=>{
        e.preventDefault()
        dispatch(FILTER_BY_SEARCH({search,products})) 
     }

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
        <div className="container-fluid">
            <a className="navbar-brand">
                <Link to='/' className='text-white text-decoration-none'><span style={{color:'#e6891e'}}><b>MyShop</b></span></Link>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {/* <li className="nav-item">
                        <a className="nav-link active" aria-current="page">
                            <Link to='/' className='text-white text-decoration-none'><span id='hover2'>Home</span></Link>
                            </a>
                    </li> */}
                    <li className="nav-item">
                        <a className="nav-link"><span>
                            <Link to='/products' className='text-white text-decoration-none'><span id='hover3'>Products</span></Link>    
                        </span></a>
                    </li>
                    {/* <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </li> */}
                </ul>
                <form className="d-flex">
                    <div className='input-group'>
                        <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                        <button className="btn btn-warning" type="submit" style={{backgroundColor:'#e6891e'}} onClick={handleSearch}><FaSearch/></button>
                    </div>
                </form>
                <ul className="navbar-nav mb-2 mb-lg-0">
                    {userrole != "admin" &&
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page">
                        <Link to='/cart' className='text-white text-decoration-none'>
                            <span id='hover4'>Cart <FaCartShopping size={25}/></span>
                            <span className="badge rounded-pill text-bg-danger" style={{position:"relative",top:'-10px'}}>
                                {cartItems.length}
                            </span>
                        </Link>
                        </a>
                    </li>}

                    <ShowOnLogout>
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page">
                        <Link to='/signup' className='text-white text-decoration-none'><span id='hover5'>Signup</span></Link></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">
                        <Link to='/login' className='text-white text-decoration-none'><span id='hover6'><FaUserAlt/> Log In</span></Link></a>
                    </li>
                    </ShowOnLogout>
                    
                    {userrole=='user' && 
                    <li className="nav-item">
                        <a className="nav-link">
                        <Link to='/order-history ' className='text-white text-decoration-none'><span id='hover6'> My Order</span></Link></a>
                    </li>
                    }

                    <ShowOnLogin>
                        <Nav.Link className='text-white text-decoration-none'><span id='hover7' style={{fontWeight:'bold'}}>Welcome {userName}</span></Nav.Link>
                        <Nav.Link className='text-white text-decoration-none' onClick={handleLogout}><span id='hover8'>Log Out</span></Nav.Link>
                    </ShowOnLogin>
                </ul>    
            </div>
        </div>
    </nav>
    </>
  )
}

export default HeaderNavbar
