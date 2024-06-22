import { Timestamp, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser';

const ChangeOrderStatus = ({order,id,orderstatus}) => {
    let [status,setStatus]=useState(orderstatus)
    let navigate=useNavigate()
    let handleSubmit=(e)=>{
        e.preventDefault()
        const orderConfig={
            userID:order.userID,
            userEmail:order.userEmail,
            orderDate:order.orderDate,
            orderTime:order.orderTime,
            orderAmount:order.orderAmount,
            orderStatus:status,
            shippingAddress:order.shippingAddress,
            cartItems:order.cartItems,
            createdAt:order.createdAt,
            editedAt:Timestamp.now().toDate()
          }
          try{
            setDoc(doc(db,"orders",id),orderConfig)
            emailjs
            .send('service_socn13l', 'template_ys9wdjj', {user_email:orderConfig.userEmail, order_status:orderConfig.orderStatus,amount:orderConfig.orderAmount,date:orderConfig.orderDate}, 'S0W3KKbgVtpN19bcM')
            .then(
              (result) => {
                toast.success("order status updated")
                navigate('/admin/orders')          
              },
              (error) => {
                console.log('FAILED...', error.text);
              });
              
        }
        catch(error){
          toast.error(error.message)
        }
    }
  return (
    <div>
     <h4>Update Order Status </h4> <hr/>
     <form onSubmit={handleSubmit}>
     <div class="mb-3">
        <label for="" class="form-label">Order Status</label>
        <select class="form-select" name="status" value={status} onChange={(e)=>setStatus(e.target.value)} >
            <option value=''>----choose Status-----</option>
            <option>Placed</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Cancelled</option>
            <option>Delivered</option>
        </select>
     </div>
     <button type="submit" class="btn btn-primary mb-3">Update</button>
     </form>
    </div>
  )
}

export default ChangeOrderStatus
