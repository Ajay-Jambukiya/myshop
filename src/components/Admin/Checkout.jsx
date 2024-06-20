import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { selectCartItems, selectTotalAmount } from '../../store/slice/cartSlice'
import { selectEmail } from '../../store/slice/authSlice'
import { selectShippingAddress } from '../../store/slice/checkoutSlice'
import CheckoutForm from '../CheckoutForm'

let stripePromise=loadStripe('pk_test_51PM3mMLW4sLiRPU1mzVXBgHAlwq4kCsljbm08HJbpHKkK7B6lAth2BOTM72l9ULlLDPUWpoX5Q39ab1s0TBk52VK00X3iLiRrc')
const Checkout = () => {
  const [message,setMessage]=useState("initailzing checkout")
  const [clientSecret,setClientSecret]=useState("")
  const cartItems=useSelector(selectCartItems)
  const totalAmount=useSelector(selectTotalAmount)
  const userEmail=useSelector(selectEmail)
  const shippingAddress=useSelector(selectShippingAddress)
  useEffect(()=>{
    fetch("http://localhost:1000/payment",{
      method:"POST",
      headers:{'content-type':'application/json'},
      body:JSON.stringify({email:userEmail,amount:totalAmount,shippingAddress:shippingAddress,description:'ecommerce site'})
    }).then((res)=>{
      return res.json().then((data)=>{
        setClientSecret(data.clientSecret)
        console.log(data.clientSecret)
      })
    }).catch((error)=>{
      setMessage("Failed to initializing checkout")
      toast.error("something went wrong")
    })
  },[])
  const appearance={theme:'stripe'}
  const options={clientSecret,appearance}
  return (
    <div className='container mt-5'>
      {!clientSecret && <h3>{message}</h3>}
      {
        clientSecret && <Elements options={options} stripe={stripePromise}>
            <CheckoutForm/>
        </Elements>
      }
    </div>
  )
}

export default Checkout
