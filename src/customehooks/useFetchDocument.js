import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'

const useFetchDocument = (collectionname,documentID) => {
    const [document,setDocument]=useState(null)
    useEffect(()=>{
        getDocument()
    },[])
    let getDocument=async()=>{
       let docRef=doc(db, collectionname,documentID)
       let docSnap = await getDoc(docRef)
       if(docSnap.exists()){
        const obj={id:documentID,...docSnap.data()}    
       setDocument(obj) 
     }
    }
  return ({document} )
}

export default useFetchDocument
