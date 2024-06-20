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
    <div class="card col-3 mx-3 mb-3 shadow">
      <Link to={`/details/${id}`}>
        <img class="card-img-top" src={imageURL} style={{height:'180px'}}  alt="Title"/>
      </Link>
      <div class="card-body">
        <h4 class="card-title">{name}</h4>
        <p class="card-text">{category}</p>
        <p class="card-text">{brand}</p>
        <p class="card-text">{price}</p>
        <button type="button" class="btn btn-warning" onClick={()=>addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductItem
