/* shipping address */

import React, { useEffect, useState } from 'react'
import { CountryDropdown } from 'react-country-region-selector'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSummary from './CheckoutSummary'
import { selectShippingAddress, store_shipping_address } from '../store/slice/checkoutSlice'

const initialAddressState={
  name:'',line1:'',line2:'',city:'',state:'',country:'',postal_code:'',phone:''
}
const CheckoutDetails = () => {
  const [shippingAddress,setShippingAddress]=useState({...initialAddressState})
  let shipping=useSelector(selectShippingAddress)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  useEffect(()=>{
    if(shipping){
      setShippingAddress({...shipping})
    }
    else{
      setShippingAddress({...initialAddressState})
    }
  },[shipping])
  const handleShipping = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  let handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(store_shipping_address(shippingAddress))
    navigate('/checkout')
  }
  return (
    <div className='container'>
    <div className='row mt-5 p-3 shadow'>
        <div className='col-6'>
          <h1>Shipping Address</h1> <hr/>
          <form onSubmit={handleSubmit}>
          <label>Recipient Name</label>
          <input
            type="text"
            placeholder="Recipient Name"
            required
            name="name" className='form-control'
            value={shippingAddress.name}
            onChange={(e) => handleShipping(e)}
          />
          <label>Address line 1</label>
          <input
            type="text"
            placeholder="Address line 1"
            required
            name="line1"
            value={shippingAddress.line1} className='form-control'
            onChange={(e) => handleShipping(e)}
          />
          <label>Address line 2</label>
          <input
            type="text"
            placeholder="Address line 2"
            name="line2"
            value={shippingAddress.line2} className='form-control'
            onChange={(e) => handleShipping(e)}
          />
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            required
            name="city"
            value={shippingAddress.city} className='form-control'
            onChange={(e) => handleShipping(e)}
          />
          <label>State</label>
          <input
            type="text"
            placeholder="State"
            required
            name="state"
            value={shippingAddress.state} className='form-control'
            onChange={(e) => handleShipping(e)}
          />
          <label>Postal code</label>
          <input
            type="text"
            placeholder="Postal code"
            required
            name="postal_code" className="mb-2 form-control"
            value={shippingAddress.postal_code}
            onChange={(e) => handleShipping(e)} 
          />
           <label>select country</label>
          <CountryDropdown valueType='short' value={shippingAddress.country} className='mb-2 form-control'
          onChange={(val)=>handleShipping({
            target:{name:"country",value:val}
          })}/>
          <label>Phone</label>
          <input
            type="text"
            placeholder="Phone"
            required
            name="phone" className="mb-2 form-control"
            value={shippingAddress.phone}
            onChange={(e) => handleShipping(e)}
          />
            <button type="submit" className="btn btn-primary">
            Proceed To Checkout
          </button>
          </form>
        </div>
        <div className='col-6'>
          <h1>Checkout Summary</h1> <hr/>
          <CheckoutSummary/>
        </div>
    </div>
    </div>
  )
}

export default CheckoutDetails
