import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase/config'

const useFetchCollection = (collectionname) => {
    const [data,setData]=useState([])
    const [isLoading,setIsLoading]=useState(false)

    let getCollection=()=>{
        setIsLoading(true)
        try{
            const docRef=collection(db,collectionname)
            const q= query(docRef,orderBy('createdAt','desc'))
            onSnapshot(q,(snapshot)=>{
                // console.log(snapshot.docs)
                const allData=snapshot.docs.map((doc)=>(
                    {id:doc.id,...doc.data()}
                ))
                setData(allData)
                setIsLoading(false)
            })
        }
        catch(error){
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        getCollection()
    },[])
  return (
    {data,isLoading}
    )
}

export default useFetchCollection
