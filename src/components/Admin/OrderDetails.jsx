import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetchDocument from '../../customehooks/useFetchDocument'
import spinnerImg from '../../assets/spinner.jpg'
import { FaArrowLeft } from 'react-icons/fa'
import ChangeOrderStatus from './ChangeOrderStatus'

const OrderDetails = () => {
    const {id,orderStatus}=useParams()
    const {document}=useFetchDocument('orders',id)
    let [order,setOrder]=useState(null)

    useEffect(()=>{
        setOrder(document)
    },[document])

    return (
      <div className='container shadow m-2 p-3'>
        <h2>Order Details</h2> <hr/>
        <Link to='/admin/orders' className='mb-3'><FaArrowLeft/> Back to Orders</Link>
        <br/><br />
        {order == null 
        ?
        <>
          <img src={spinnerImg} alt="Loading..." style={{width:'50px',height:'50px'}}/>
        </> 
        :
        <>
            
          <b>Shipping Address</b>
          <br />
          Address: {order.shippingAddress.line1},
          {order.shippingAddress.line2}, {order.shippingAddress.city}
          <br />
          State: {order.shippingAddress.state}
          <br />
          Country: {order.shippingAddress.country}
          <br /><br />
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((cart, index) => {
                const { id, name, price, imageURL, cartQuantity } = cart;
                return (
                  <tr key={id}>
                    <td>
                      <b>{index + 1}</b>
                    </td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <img src={imageURL} alt={name} style={{ width: "50px" }}/>
                    </td>
                    <td>{price}</td>
                    <td>{cartQuantity}</td>
                    <td>{(price * cartQuantity)}</td>
                  </tr>
                );
              })
              }
            </tbody>
          </table>
          <ChangeOrderStatus order={order} id={id} orderstatus={orderStatus}/>
        </>
        }
      </div>
    )
}


export default OrderDetails
