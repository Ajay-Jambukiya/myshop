import React from 'react'
import { ADD_TO_CART } from '../../store/slice/cartSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const ProductItem = ({id,name,price,imageURL,brand,category,product}) => {
const dispatch=useDispatch()

    let addToCart=(product)=>{
        dispatch(ADD_TO_CART(product))
    }

  return (
    <div className="card col-sm-5 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-2 mx-3 mb-3 shadow">
      <Link to={`/details/${id}`}>
        <img className="card-img-top" src={imageURL} style={{height:'180px'}}  alt="Title"/>
      </Link>
      <div className="card-body">
        <h4 className="card-title">{name}</h4>
        <p className="card-text">{category}</p>
        <p className="card-text">{brand}</p>
        <p className="card-text">{price}</p>
        <button type="button" className="btn btn-warning" onClick={()=>addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductItem
