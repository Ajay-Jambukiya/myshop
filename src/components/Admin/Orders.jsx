import React, { useEffect } from 'react'
import useFetchCollection from '../../customehooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrders, store_order } from '../../store/slice/orderSlice'
import { selectUserId } from '../../store/slice/authSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'

const Orders = () => {
    let {data,isLoading}=useFetchCollection("orders")
    let dispatch=useDispatch()
    let orders=useSelector(selectOrders) 
    const userID=useSelector(selectUserId)
    const navigate=useNavigate()

    useEffect(()=>{
        dispatch(store_order({orders:data}))
    },[data,dispatch])

    let handleOrder=(id,orderStatus)=>{
        if(orderStatus=="Delivered")
            navigate('/admin/orders')
        else
            navigate(`/admin/order-details/${id}/${orderStatus}`)
    }

  return (
    <div className='shadow mt-2 p-3'>
      <h1>Orders</h1> <hr/>
      {isLoading && <Loader/>}
      {orders.length==0?
      <p>No order Found</p>
        :
        <>
         <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const {id, orderDate, orderTime, orderAmount, orderStatus} = order;
                    return (
                      <tr key={id} onclick={()=>handleOrder(id,orderStatus)}> 
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>
                          {"$"}
                          {orderAmount}
                        </td>
                        <td>
                          <p className={
                              orderStatus !== "Delivered"
                                ? "text-danger"
                                : "text-success"
                            }>
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>   
        </>
    }
    </div>
  )
}

export default Orders
