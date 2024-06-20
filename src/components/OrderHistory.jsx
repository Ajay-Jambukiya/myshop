import React, { useEffect } from 'react'
import useFetchCollection from '../customehooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrders, store_order } from '../store/slice/orderSlice'
import { selectUserId } from '../store/slice/authSlice'
import Loader from './Loader'


const OrderHistory = () => {
    let {data,isLoading}=useFetchCollection("orders")
    let dispatch=useDispatch()
    let orders=useSelector(selectOrders) 
    const userID=useSelector(selectUserId)

    useEffect(()=>{
        dispatch(store_order({orders:data}))
    },[data,dispatch])

    const filterOrders=orders.filter((order)=>order.userID==userID)
     
  return (
    <div className='container shadow mt-5 p-3 '>
    <h1>Your Order History</h1> <hr/>
    {isLoading && <Loader/>}
    {filterOrders.length==0?
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
                {filterOrders.map((order, index) => {
                  const {
                    id, orderDate, orderTime, orderAmount, orderStatus,} = order;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td> {orderDate} at {orderTime}
                      </td>
                      <td>{id}</td>
                      <td> {"$"}{orderAmount} </td>
                      <td>
                        <p className={
                            orderStatus !== "Delivered"
                              ? "text-danger": "text-success"  } >
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

export default OrderHistory
