import React, { useEffect } from 'react'
import useFetchCollection from '../../customehooks/useFetchCollection'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts, store_product } from '../../store/slice/ProductSlice'
import { FaPen, FaTrash } from 'react-icons/fa'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../../firebase/config'
import { deleteObject, ref } from 'firebase/storage'
import { toast } from 'react-toastify'

const ViewProducts = () => {
    let {data,isLoading}=useFetchCollection("products")
    let dispatch=useDispatch()
    let products=useSelector(selectProducts)
    useEffect(()=>{
        dispatch(store_product({products:data}))
    },[data,dispatch])
  
    let deleteProduct=(id,imageURL)=>{
        if(window.confirm("are you sure to delete this product??")){
          removeProduct(id,imageURL)
        }
    }
  let removeProduct=async(id,imageURL)=>{
    try{
       await deleteDoc(doc(db,"products",id))
        let imgRef=ref(storage,imageURL)
        deleteObject(imgRef)
        toast.success("Product deleted")
    }
    catch(error){toast.error(error.message)}
        
  }

  return (
    <div>
      <h1>All Products</h1><hr />
      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow">
            <thead>
                <tr className='text-center'>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.length==0 && <tr><td colSpan={6}>No product found</td></tr>}
                {products.map((product,index)=>
                <tr key={index} className='text-center'>
                    <td>{index+1}</td>
                    <td>{product.name}</td>
                    <td>
                        <img src={product.imageURL} style={{width:'50px',height:'50px'}}/>
                    </td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>
                        <Link to={`/admin/editproduct/${product.id}`} className='btn btn-success'><FaPen/></Link>
                        <button type="button" className='btn btn-danger ms-2' onClick={()=>deleteProduct(product.id,product.imageURL)}><FaTrash/></button>
                    </td>
                </tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewProducts
