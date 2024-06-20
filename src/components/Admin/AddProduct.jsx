import axios from 'axios'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db, storage } from '../../firebase/config'
import Loader from '../Loader'
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import './Progress.css'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../store/slice/ProductSlice'

const initialState={id:"",name:"",price:"",brand:"",imageURL:"",countInStock:"",desc:"",category:''}
const categories=[
    {id:'1',name:'mobiles'},
    {id:'2',name:'fashion'},
    {id:'3',name:'toys'},
    {id:'4',name:'electronics'},
]

const AddProduct = () => {
    let {id}=useParams()
    const [product,setProduct]=useState({...initialState})
    const [uploadProgress,setUploadProgress]=useState(0)
    const [isLoading,setIsLoading]=useState(false)
    let navigate=useNavigate()

    let products=useSelector(selectProducts)
    let productEdit=products.find((item,index)=>item.id==id)
    useEffect(()=>{
        if(id) { setProduct({...productEdit})}
        else {setProduct({...initialState})}
    },[id])

    let handleImage=(e)=>{
        let file=e.target.files[0]
        const storageRef=ref(storage,`myshop-11thApr/${Date.now()}${file.name}`)
        const uploadTask=uploadBytesResumable(storageRef,file)
        uploadTask.on("state_changed",(snapshot)=>{
            const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
            setUploadProgress(progress)
        },(error)=>toast.error(error.message),
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                // console.log(url)
                setProduct({...product,imageURL:url})
            })
        })
    }
    let addproduct=(e)=>{
        e.preventDefault();
        setIsLoading(true)
        if(!id){
        try{
            addDoc(collection(db,"products"),{
                name:product.name,
                price:product.price,
                imageURL:product.imageURL,
                category:product.category,
                desc:product.desc,
                brand:product.brand,
                countInStock:product.countInStock,
                createdAt:Timestamp.now().toDate()
            })
            setIsLoading(false)
            toast.success("Product added")
            navigate('/admin/viewproducts')
        }
        catch(error){
            setIsLoading(false)
            toast.error(error.message)
        }
        }
        else{
            if(product.imageURL != productEdit.imageURL){
                let imageRef=ref(storage,productEdit.imageURL)
                deleteObject(imageRef)
            }
            try{
                setDoc(doc(db,"products",id),{
                    name:product.name,
                    price:product.price,
                    imageURL:product.imageURL,
                    category:product.category,
                    desc:product.desc,
                    brand:product.brand,
                    countInStock:product.countInStock,
                    createdAt:product.createdAt,
                    updatedAt:Timestamp.now().toDate()
                })
                setIsLoading(false)
                toast.success("Product updated")
                navigate('/admin/viewproduct')
            }
            catch(error){
                setIsLoading(false)
                toast.error(error.message)
            }
        }
    }
  return (
    <>
        {isLoading && <Loader/>}
        <h1>{id?"Edit ": "Add "}Product</h1>
        <form onSubmit={addproduct}>
        <div class="row">
        <div className='form-group col-6'>
            <label>Name</label>
            <input type="text" className='form-control' name="name" value={product.name}
            onChange={(e)=>setProduct({...product,name:e.target.value})}/>
        </div>
        <div className='form-group col-6'>
            <label>Price</label>
            <input type="text" className='form-control' name="price"  value={product.price}
            onChange={(e)=>setProduct({...product,price:e.target.value})} />
        </div>
        <div className='form-group'>
            <label>Image</label>
            {uploadProgress==0 ? null :
                <div className='progress mb-2'>
                    <div className='progress-bar' style={{width:`${uploadProgress}%`}}>
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                    </div>
                </div>
            }
            <input type="file" className='form-control'  name="imageURL" accept='image/*' onChange={handleImage}/>
        </div>
        {id && <img src={productEdit.imageURL} style={{width:'150px',height:'100px',marginTop:'5px'}}/> }
        </div>
        <div className='form-group'>
            <label>Categories</label>
            <select name="category" className='form-select' value={product.category}  onChange={(e)=>setProduct({...product,category:e.target.value})}>
                <option selected value=''>-------choose category-----------</option>
                {categories.map((c,index)=><option key={index}>{c.name}</option> )}
            </select>
        </div>
        <div className='form-group'>
            <label>Brand</label>
            <input type="text" className='form-control' name="brand"  value={product.brand}
            onChange={(e)=>setProduct({...product,brand:e.target.value})}/>
        </div>
        <div className='form-group'>
            <label>countInStock</label>
            <input type="number" className='form-control' name="countInStock"  value={product.countInStock}
            onChange={(e)=>setProduct({...product,countInStock:e.target.value})} />
        </div>
        <div className='form-group'>
            <label>Description</label>
            <textarea className='form-control' name="desc"  value={product.desc}
            onChange={(e)=>setProduct({...product,desc:e.target.value})}></textarea>
        </div>
        <div class="d-grid gap-2">
          <button type="submit" name="" id="" class="btn btn-primary mt-2">Save Product</button>
        </div>
      </form>
    </>
  )
}

export default AddProduct
