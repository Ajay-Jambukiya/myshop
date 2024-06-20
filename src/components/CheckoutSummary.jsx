import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { selectCartItems, selectTotalAmount } from '../store/slice/cartSlice'

const CheckoutSummary = () => {
    const cartItems=useSelector(selectCartItems)
    const cartTotalAmount=useSelector(selectTotalAmount)
  return (
    <div>
      {cartItems.length==0 && <>
        <p>No Item in cart</p>
        <Link to='/'><FaArrowLeft/> Back to home</Link>
      </>}
      <> <h4>{`Cart Item(s) : ${cartItems.length}`}</h4>
            <h5>{`Subtotal: ${cartTotalAmount}`}</h5>
            {cartItems.map((item,index)=>
                <div className="card mb-2" key={index}>
                    <div className="card-body">
                        <h4 className="card-title">Product: {item.name}</h4>
                        <p className="card-text">Quantity: {item.cartQuantity}</p>
                        <p className="card-text">Unit Price: {item.price}</p>
                        <p className="card-text">Total: {item.price * item.cartQuantity}</p>
                    </div>
                </div>
            )}
            </>
    </div>
  )
}

export default CheckoutSummary
