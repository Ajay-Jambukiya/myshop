import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProductList from './ProductList';
import useFetchCollection from '../../customehooks/useFetchCollection';
import { selectProducts, store_product } from '../../store/slice/ProductSlice';
import { selectfilterProducts, selectsearch } from '../../store/slice/filterSlice';

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
  )
}

export default Products
