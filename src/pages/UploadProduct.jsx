import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import ProductcardAmin from '../components/ProductcardAmin'
import AxiosToastError from '../utils/AxiosToastError'

const UploadProduct = () => {
    const [page , setpage] = useState(1)
    const [productdata  , setproductdata] = useState([])
    const [loading , setloading] = useState(false)
    const [totalpagecount , settotalpagecount] = useState(1)
  const fetchproductdata = async()=>{
    try {
      setloading(true)
      const response = await Axios({
        ...SummaryApi.get_product,
        data : {
          page : page,
          limit : 12
        }
      })
      const {data : responsedata} = response
      console.log("responsedata.totalNoPage",responsedata.totalNoPage);
      
      if (responsedata.success) {
        settotalpagecount(responsedata.totalNoPage)
        setproductdata(responsedata.data)
      }
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setloading(false)
    }
  }
  const handlenext  = ()=>{
    if (page !== totalpagecount) {
      setpage(preve => preve + 1)
    }
  }
  const handleprevious = ()=>{
    if (page !== 1) {
      setpage(preve => preve - 1)
    }
  }


  useEffect(()=>{
    fetchproductdata()
  },[page])
  return (
    <section>
       <div className="bg-white p-4 shadow-lg flex items-center justify-between">
        <div className="text-[23px] font-semibold">Product</div>
      </div>
    <div className='bg-blue-50 p-4' >
    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 ' >
    {
      productdata.map((p , index)=>{
        return(
          <ProductcardAmin data={p} />
        )
      })
    }
    </div>
    </div>

    <div className='flex justify-between p-4'>
      <button onClick={handleprevious} className='border border-blue-900 px-4 py-1 hover:bg-blue-900 hover:text-white ' >Previous</button>
      <button>{page}/{totalpagecount}</button>
      <button onClick={handlenext} className='border border-blue-900 px-4 py-1 hover:bg-blue-900 hover:text-white ' >Next</button>
      
    </div>

      </section>
  )
}

export default UploadProduct