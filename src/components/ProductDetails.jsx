import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetchDocument from '../customehooks/useFetchDocument'
import spinnerImg from '../assets/spinner.jpg'
import { FaLessThan } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, DECREASE, selectCartItems } from '../store/slice/cartSlice'

const ProductDetails = () => {
    const {id} =useParams()
    const {document}=useFetchDocument("products",id)
    const [product,setProduct]=useState(null)
    const cartItems=useSelector(selectCartItems)
    const cart=cartItems.find((item)=>item.id === id)
    const isCartAdded= cartItems.findIndex((item)=>item.id === id)
    const dispatch=useDispatch()

    useEffect(()=>{
        setProduct(document)
    },[document])

  return (
    <div className='container mt-4'>
    <div className='col-12'>
      <h2>Product Details</h2>
      <Link to='/' className='btn btn-primary'>&#129120; Back</Link>
    </div>
    <div className='row shadow mt-2 border p-5'>
      {product==null
       ?
      <img src={spinnerImg} alt="Loading" style={{width:'100px'}}/>
      :
      <>
        <div className='col-7'>
          <img src={product.imageURL} alt={product.name} 
          style={{width:'500px',height:'250px',borderRadius:'5px'}} className='shadow img-fluid'/>
      </div>
      <div className='col-5'>
          <h3>{product.name}</h3>
          <p>{product.brand}</p>
          <p>{product.desc}</p>
          <p>{product.price}</p>
          <div>
            {isCartAdded < 0 
            ?
            <button type="button" class="btn btn-danger" onClick={()=>dispatch(ADD_TO_CART(product ))}>Add to Cart</button>
            :
            (
            <>
            <div className='input-group'>
                <button type="button" style={{height:'30px',width:'30px',backgroundColor:'#e6891e',border:'none',borderRadius:'5px'}} onClick={()=>dispatch(DECREASE(product))}>-</button>
                <input type="text" className='text-center' value={cart.cartQuantity} style={{width:'30px',backgroundColor:'transparent',border:'none'}} readOnly/>
                <button type="button" style={{height:'30px',width:'30px',backgroundColor:'#e6891e',border:'none',borderRadius:'5px'}} onClick={()=>dispatch(ADD_TO_CART(product))}>+</button>
            </div>
            <div className='mt-3'>
                <Link to='/cart'>
                <button className='btn btn-warning'>Go to Cart</button>
                </Link>
            </div>
              </>
            )
            }
          </div>
          
      </div>
    </>
}
    </div>
</div>
  )
}

export default ProductDetails
