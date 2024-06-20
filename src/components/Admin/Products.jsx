import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProductList from './ProductList';
import useFetchCollection from '../../customehooks/useFetchCollection';
import { selectProducts, store_product } from '../../store/slice/ProductSlice';

const Products = () => {
    let {data,isLoading}=useFetchCollection("products");
    const dispatch=useDispatch()
    const products=useSelector(selectProducts)
    useEffect(()=>{
        dispatch(store_product({products:data}))
    },[data,dispatch])
  return (
    <div className='container'>
      <h1>My Products</h1>
      <hr />
      <ProductList products={products}/>
    </div>
  )
}

export default Products
