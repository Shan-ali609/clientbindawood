import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import CardLoading from '../components/CardLoading'
import AxiosToastError from '../utils/AxiosToastError'
import Cardproduct from './Cardproduct'

const Categorywiseproductdisplay = ({id,name}) => {

   const [data , setdata] =useState([])
   const [loading , setloading] =useState(false)

   const fetchcategorywiseproduct=async () => {
       try {
        setloading(true)
        const response = await Axios({
            ...SummaryApi.categorywise_product,
            data : { id : id }
        })     
        const {data : responsedata} = response
        if(responsedata.success){
            setdata(responsedata.data)
        };
    } catch (error) {
        AxiosToastError(error)
    }finally{
        setloading(false)
    }
   }

    useEffect(()=>{
        fetchcategorywiseproduct()
    },[]) 
  
   const cardloading = new Array(6).fill(null)

  return (
    <div>
        <div>
          <p className='pl-8 font-bold py-5'>{name}</p>
        </div>

        <div className="flex gap-4 overflow-x-auto px-4 py-2">
            {
            loading ? (
                cardloading.map((c, index) => (
                    <div key={index + "catalog"} className="min-w-[200px] bg-white rounded p-4 animate-pulse">
                        <CardLoading />
                    </div>
                ))


                ) : (       
                data.map((p, index) => {
                    return (
                        <div key={index + "productlistpage123"} className="">
                           <Cardproduct data={p} />
                        </div>
                    )
                }))
            }
            </div>

  </div>
  )
}

export default Categorywiseproductdisplay