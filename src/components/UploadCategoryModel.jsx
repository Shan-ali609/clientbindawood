import React from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import uploadimage from "../utils/uploadimage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const UploadCategoryModel = ({ close , datafetch }) => {
   const [data , setdata] = useState({
    name: "",
    image: ""
   })
   const [loading , setloading ] = useState(false)
   const handleonchange = (e)=>{
      const {name , value} = e.target 

      setdata((preve)=>{
         return{
          ...preve,
          [ name ] : value
         }
      })
   }
    const handlesubmit = async(e)=>{
      e.preventDefault()
      try {
        setloading(true)

        const response = await Axios({
          ...SummaryApi.addcategory,
              data : data
        })
        const { data : responsedata} = response
         
        if (responsedata.success) {
           toast.success(responsedata.message)
           close()
           datafetch()
        }
        
      } catch (error) {
        AxiosToastError(error)
      }finally{
        setloading(false)
      }
    }




   const handleUploadCategoryImage  =async (e)=>{
      const file  = e.target.files[0]
      if(!file){
         return
      }
      setloading(true)
      try {
        const resposne = await uploadimage(file)
        // console.log("resposne",resposne )
        const { data : Imageresponse} = resposne
        // console.log(Imageresponse.data.url);
             
        setdata((pre)=>{
          return{
              ...pre,
              image : Imageresponse.data.url
            }
        })
        
      } catch (error) {
        AxiosToastError(error)
      }finally{
        setloading(false)
      }
    
      
   }
  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-600 z-50 flex items-center content-center rounded ">
      <div className="bg-white  max-w-4xl mx-auto w-full rounded">
        <div className=" flex items-center justify-between p-2 ">
          <p className="font-semibold text-2xl">Category</p>
          <div onClick={close} className=" cursor-pointer  ">
            <RxCross2 />
          </div>
        </div>
        <form action="" className="grid p-2" onSubmit={handlesubmit} >
          <div className=" flex flex-col gap-2">
            <label id="categoryname" className="font-semibold">Name</label>
            <input type="text" id="categoryname" placeholder="Enter Category name" value={data.name}
             onChange={handleonchange}  name="name"
            className='bg-blue-50 p-2 border border-blue-100 focus-within:border-blue-900 outline-none rounded' />
          </div>

          <div className='grid gap-1'>
                    <p>Image</p>
                    <div className='flex gap-4 flex-col lg:flex-row items-center'>
                        <div className='border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded'> 
                                  {
                                    data.image? (
                                        <img 
                                        alt="category"
                                        src={data.image}
                                        className="h-full w-full object-scale-down"
                                        />
                                    ):(
                                
                                      <p className='text-sm text-neutral-500'>No Image</p>
                                     
                                    )
                                  }
                        </div>
                        <label htmlFor='uploadCategoryImage'>
                            <div  className={`
                            ${!data.name ? "bg-gray-300" : "border-blue-900 hover:bg-blue-900 hover:text-white " }  
                                px-4 py-2 rounded cursor-pointer border font-medium
                            `}>
                                {
                                  loading ? (
                                    <div>loading..</div>
                                  ):(
                                    <div>
                                    Upload Image
                                    </div>
                                  )
                                }
                             </div>

                            <input disabled={!data.name} onChange={handleUploadCategoryImage} type='file' id='uploadCategoryImage' className='hidden'/>
                        </label>
                        
                    </div>
                </div>

                <div className={`  ${ data.name && data.image ? ' bg-blue-900':'bg-slate-500'}    my-9 p-2 text-center cursor-pointer`}>
                  <button>Add Category</button>
                </div>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
