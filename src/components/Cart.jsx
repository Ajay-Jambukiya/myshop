import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTALQUANTITY, DECREASE, EMPTY_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectTotalAmount, selectTotalQuantity } from '../store/slice/cartSlice'
import { FaTrashAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import ProductDetails from './ProductDetails'
import { selectIsLoggedIn } from '../store/slice/authSlice'

const Cart = ({id}) => {
    const cartItems=useSelector(selectCartItems)
    const dispatch=useDispatch()
    const cartAmount=useSelector(selectTotalAmount)
    // const cartCount=useSelector(selectTotalQuantity)
    const isLoggedIn=useSelector(selectIsLoggedIn)
    const navigate=useNavigate()

    useEffect(()=>{
        dispatch(CALCULATE_SUBTOTAL())
    })
    let checkout=()=>{
        if(isLoggedIn){
            navigate('/checkout-details')
        }else{
            let url=window.location.href
            // console.log(url)
            dispatch(SAVE_URL(url))
            navigate('/login')
        }
    }


  return (
    <>
    <div className=' mt-3 pt-3 container shadow'>
        <h3 style={{color:'#3f3d56'}}>Cart Items</h3>
        <hr />
        <div className="table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr className={``}>
                        <th scope="col">Sr. No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.length==0 && <tr><td colSpan={7} style={{color:'#3f3d56',textAlign:'center'}}>No item in cart</td></tr>}
                    {cartItems.map((item,index)=>
                    <tr key={index}>
                        <td >{index+1}</td>
                        <td>{item.name}
                            <br/>{item.brand} 
                            <br/>{item.desc}
                        </td>
                        <td>
                            <Link to=''>
                            <img src={item.imageURL} style={{height:'50px',width:'50px'}}/>
                            </Link>
                        </td>
                        <td>{item.price}</td>
                        <td>
                            <div className="input-group gap-2 mt-1">
                                <button className='mt-1' style={{height:'30px',width:'30px',backgroundColor:'#e6891e',border:'none',borderRadius:'5px'}} onClick={()=>dispatch(DECREASE(item))}>-</button>
                                <input type="text" className='text-center' value={item.cartQuantity} style={{width:'30px',backgroundColor:'transparent',border:'none'}} readOnly/>
                                <button className='mt-1' style={{height:'30px',width:'30px',backgroundColor:'#e6891e',border:'none',borderRadius:'5px'}} onClick={()=>dispatch(ADD_TO_CART(item))}>+</button>
                            </div>
                            </td>
                        <td>{item.price * item.cartQuantity}</td>
                        <td>
                            <button type="button" className="btn btn-danger"  onClick={()=>dispatch(REMOVE_FROM_CART(index))}>
                            <FaTrashAlt/></button>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
        </div>

        <div className='container mt-3'>
        <div className="row">
          <div className="col-6 mb-3">
            <button className='btn btn-danger' onClick={()=>dispatch(EMPTY_CART())}>Empty Cart</button>
          </div>
          <div className="col-4 offset-2 mb-3">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Total: <span className='float-end'>₹{cartAmount}</span></h4>
                        <p className="card-text"></p>
                        <hr />
                        <div className='d-grid gap-2'>
                        <button className='btn btn-warning' onClick={checkout}>Checkout</button>
                        </div>
                    </div>
                </div>
                
            
          </div>
        </div>
        </div>


        </>
  )
}

export default Cart
