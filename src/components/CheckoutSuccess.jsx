import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <div className='container m-5'>
        <h2 style={{color:'#3f3d56'}}>Checkout successfully</h2>
        <p style={{color:'#3f3d56'}}>Thank you for your purchase</p>
        <br />
        <Link to='/order-history' className='btn btn-warning'>View Order Status</Link>
    </div>
  )
}

export default CheckoutSuccess
