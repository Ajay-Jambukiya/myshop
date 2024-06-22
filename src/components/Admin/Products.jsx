import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProductList from './ProductList';
import useFetchCollection from '../../customehooks/useFetchCollection';
import { selectProducts, store_product } from '../../store/slice/ProductSlice';
import { selectfilterProducts, selectsearch } from '../../store/slice/filterSlice';
import { BiUpArrow } from 'react-icons/bi';
import { BsArrowBarUp, BsArrowUp } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';

const Products = () => {
    let {data,isLoading}=useFetchCollection("products");
    const dispatch=useDispatch()
    const products=useSelector(selectProducts)
    useEffect(()=>{
        dispatch(store_product({products:data}))
    },[data,dispatch])
    const filterproducts = useSelector(selectfilterProducts)
    const selectsrch = useSelector(selectsearch)

  return (
    <>
    <div className='container'>
      <h1>My Products</h1>
      <hr />
      {selectsrch==""? <ProductList products={products}/>:
      <>
      {filterproducts.length == 0  // we can write 0 as well 
      ?
      <h1>No product found</h1>
      :
      <ProductList products={filterproducts}/>
      }
      </>
    }
    </div> 

    {/* <div className='text-center row'>
    <footer className='col-11 py-3' style={{backgroundColor:'#071e26',color:'white'}}>MyShop
    </footer>
    <span className='col py-3' style={{backgroundColor:'#071e26',color:'white'}}>
      <Link><FaArrowUp/></Link>
    </span>
    </div> */}
    </>
  )
}

export default Products
