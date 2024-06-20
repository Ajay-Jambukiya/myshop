import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <div className='container'>
        <h2>Checkout successfully</h2>
        <p>Thank you for your purchase</p>
        <br />
        <Link to='/order-history' className='btn btn-primary'>View Order Status</Link>
    </div>
  )
}

export default CheckoutSuccess
