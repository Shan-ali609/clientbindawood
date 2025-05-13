import React, { useState } from 'react'
import { SlCloudUpload } from "react-icons/sl";
import uploadimage from '../utils/uploadimage';
import AxiosToastError from '../utils/AxiosToastError';
import Viewimage from '../components/Viewimage';
import { TiDeleteOutline } from "react-icons/ti";
import { useSelector } from 'react-redux';
import Openaddfield from '../components/Openaddfield';
import SummaryApi from '../common/SummaryApi';
import Successalert from '../utils/Successalert';
import Axios from '../utils/Axios';

const ProductAdmin = () => {
  const [data , setdata] = useState({
    name : "",
    image : [],
    category : [],
    subCategory : [],
    unit : "",
    stock : "",
    price : "",
    discount : "",
    description : "",
    more_details : {},
    
  })
  const [loading , setloading] = useState(false)
 const [viewimageurl , setviewimageurl] = useState("")
 const allcategory = useSelector(state=>state.product.allCategory)
 const [selectcategory , setSelectcategory ] = useState()
 const [selectSubcategory , setSelectSubcategory ] = useState()
 const allSubcategory = useSelector(state=>state.product.allSubCategory)

 

  const handleOnChange = (e)=>{
        const {name , value} =e.target

        setdata((preve)=>{
          return{
            ...preve,
            [name] : value
          }
        })
  }

  const handleuploadproductimage =async(e)=>{
      const file = e.target.files[0]

      if (!file) {
        console.error("No file selected!");
        return
      }
      // console.error(" selected!",file);
      
      try {
        setloading(true)
        const response = await uploadimage(file)
        // console.log("upload data", response);
        const { data : responsedata } = response 
        const imageurl = responsedata.data.url
        // console.log("image url", responsedata);
        
        setdata((preve)=>{
          return{
            ...preve,
            image : [...preve.image,imageurl]
          }
        })
        
      } catch (error) {
        AxiosToastError(error)
      } finally{
        setloading(false)
      }
  }

  const handleDeleteproductimage = (index)=>{
        data.image.splice(index,1)
        setdata((preve)=>{
          return{
           ...preve
          }
        })
  }

  const handleRemoveSelectedCategory = (Categoryid)=>{
    setdata((preve)=>{
      return{
        ...preve,
        category : preve.category.filter((cate)=> cate._id !==Categoryid )

      }
    })
  }

  const handleRemoveSelectedSubCategory = (Categoryid)=>{
    setdata((preve)=>{
      return{
        ...preve,
        subCategory : preve.subCategory.filter((cate)=> cate._id !==Categoryid )

      }
    })
  }
  const [openaddfield , setopenaddfield] = useState(false)
  const [fieldName , setfieldName] = useState("")
 //  console.log("All Subcategory", allSubcategory);

  const handleAddField = ()=>{
    setdata((preve)=>{
      return{
        ...preve,
        more_details : {
          ...preve.more_details,
          [fieldName] : "" 
        }
      }
    })
    setfieldName("")
    setopenaddfield(false)
  }
  
  const handleSubmit = async(e)=>{
      e.preventDefault()
      try {
        console.log("request")
        const response = await Axios({
          ...SummaryApi.create_product,
          data : data
        })
        const {data : resData} = response
      
        if (resData.success) { 
          Successalert(resData.message)
        }
        setdata({
          name : "",
          image : [],
          category : [],
          subCategory : [],
          unit : "",
          stock : "",
          price : "",
          discount : "",
          description : "",
          more_details : {},
        })
      } catch (error) {
        AxiosToastError(error)
      }   
  }
  return (
    <section>
       <div className="bg-white p-4 shadow-lg flex items-center justify-between">
        <div className="text-[23px] font-semibold">Upload Product</div>
      </div>
      <div className='p-4'>
         <form action="" className=' grid gap-3' onSubmit={handleSubmit} >
          <div className='grid gap-1'>
            <label className='text-[18px] ' htmlFor="name">Name</label>
            <input id='name' type='text' placeholder='Enter product name'
            name='name'
            value={data.name}
            onChange={handleOnChange}
            required
            className='p-2 bg-blue-50 outline-none focus-within:border-primary-100 border rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label className='text-[18px] ' htmlFor="description">Description</label>
            <textarea id='description' type='text' placeholder='Enter product description'
            name='description'
            value={data.description}
            onChange={handleOnChange}
            rows={4}
            required
            className='p-2 bg-blue-50 outline-none focus-within:border-primary-100 border resize-none rounded'
            > </textarea>
          </div>
          <div className='grid gap-1'>
            <label className='text-[18px]  ' htmlFor="image">Image
            <div className='border border-gray-200 w-full cursor-pointer h-28 flex flex-col items-center justify-center '>
            <SlCloudUpload className='h-9 w-9' />
            {
              loading ? <p className='text-12'>Loading...</p>:<p className='text-[14px]'>upload image</p>
            }
          
           
            </div>
            <input id='image' type='file'
            name='name'
            onChange={handleuploadproductimage}
            accept='image/*'
           required
            className='hidden'
            />
            </label>
             <div className='flex gap-6 p-4'>
              {
                data.image.map((img,index)=>{
                  return (
                  <div key={index} className='h-36 w-36 max-w-20 border cursor-pointer relative'>
                    <img 
                     src={img}
                     alt={img}
                     onClick={()=>{setviewimageurl(img)}}
                     className='h-full w-full object-scale-down'
                    />
                   <div className='absolute top-0 right-0' onClick={()=>handleDeleteproductimage(index)} >
                   <TiDeleteOutline />
                   </div>
                  </div>
                
                )})
              }
             </div>
          </div>
          <div className='grid gap-2'>
            <label htmlFor="category">Category</label>
            <select className='p-1 bg-blue-50 outline-none border border-gray-200 orunded focus-within:border-primary-200' 
               value={selectcategory}
               onChange={(e)=>{
                  const value = e.target.value
                  const category = allcategory.find(el=>el._id === value)
                  // console.log("value",category);
                  setdata((preve)=>{
                    return{
                        ...preve,
                        category : [...preve.category,category]
                      }
                  })
                  setSelectcategory("")
                  
               }}
               >
              <option value="" disabled>Select value</option>
              {
                      allcategory.map((category, index)=>{
                         return(
                          <option key={category._id+"Subcategory"} value={category._id} >{category?.name}</option> 
                         )
                      })
                    } 
            </select>
            <div className='flex flex-wrap gap-5'>
            {
              data.category.map((Cname,index)=>{
                return(
                  <p key={index} className='bg-white shadow-lg flex  items-center justify-between' >{Cname.name}
                  <div onClick={()=>{handleRemoveSelectedCategory(Cname._id)}}> <TiDeleteOutline className='pl-2 text-2xl cursor-pointer hover:text-red-500' /> </div>
                  </p>
                )
              })
            }
            </div>
          </div>

          <div className='grid gap-2'>
            <label htmlFor="SubCategory">SubCategory</label>
            <select className='p-1 bg-blue-50 outline-none border border-gray-200 orunded focus-within:border-primary-200' 
               value={selectSubcategory}
               onChange={(e)=>{
                  const value = e.target.value
                  const subcategory = allSubcategory.find(el=>el._id === value)
                  // console.log("value",category);
                  setdata((preve)=>{
                    return{
                        ...preve,
                        subCategory : [...preve.subCategory,subcategory]
                      }
                  })
                  setSelectSubcategory("")
                  
               }}
               >
              <option value="" disabled>Select value</option>
              {
                      allSubcategory.map((subcategory, index)=>{
                         return(
                          <option key={subcategory._id+"Subcategory"} value={subcategory._id} >{subcategory?.name}</option> 
                         )
                      })
                    } 
            </select>
            <div className='flex flex-wrap gap-5'>
            {
              data.subCategory.map((SubCname,index)=>{
                return(
                  <p key={index} className='bg-white shadow-lg flex  items-center justify-between' >{SubCname.name}
                  <div onClick={()=>{handleRemoveSelectedSubCategory(SubCname._id)}}> <TiDeleteOutline className='pl-2 text-2xl cursor-pointer hover:text-red-500' /> </div>
                  </p>
                )
              })
            }
            </div>
          </div>

         <div className='grid gap-2'>
          <label htmlFor="unit">Unit</label>
          <input 
          name='unit'
          placeholder='Enter product Unit'
           type='number'
           value={data.unit}
           onChange={handleOnChange}
           className='bg-blue-50 border border-primary-200 p-1'
           required
          />
         </div>

         <div className='grid gap-2'>
          <label htmlFor="stock">No. of Stock</label>
          <input 
          name='stock'
          placeholder='Enter product stock'
           type='number'
           value={data.stock}
           onChange={handleOnChange}
           className='bg-blue-50 border border-primary-200 p-1'
          />
         </div>

         <div className='grid gap-2'>
          <label htmlFor="stock">Price</label>
          <input 
          name='price'
          placeholder='Enter product price'
           type='number'
           value={data.price}
           onChange={handleOnChange}
           className='bg-blue-50 border border-primary-200 p-1'
           required
          />
         </div>

         <div className='grid gap-2'>
          <label htmlFor="stock">Discount</label>
          <input 
          name='discount'
          placeholder='Enter product discount'
           type='number'
           value={data.discount}
           onChange={handleOnChange}
           className='bg-blue-50 border border-primary-200 p-1'
          />
         </div>

         {
            Object.entries(data?.more_details || {}).map(([key, value], index) => {
              return (
                <div className='grid gap-2' key={index}>
                  <label htmlFor={key}>{key}</label>
                  <input 
                    id={key}
                    type='text'
                    value={value}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setdata(prev => ({
                        ...prev,
                        more_details: {
                          ...prev.more_details,
                          [key]: newValue
                        }
                      }));
                    }}
                    className='bg-blue-50 border border-primary-200 p-1'
                  />
                </div>
              );
            })
          } 

        
        <div onClick={()=>setopenaddfield(true)} className='grid gap-2 cursor-pointer'>
          <div  className='px-4 py-2 rounded hover:bg-primary-200 border border-primary-200 inline-block w-32 cursor-pointer'> Add Field </div>  
        </div>
 

          <button className='bg-blue-900 text-white w-full py-1 text-center' type='submit' >Submit</button>

         </form>
      </div>
      {
        viewimageurl && (
        <Viewimage url={viewimageurl} close={()=>setviewimageurl(false)} />
      )}

      {
        openaddfield && (
          <Openaddfield 
          value={fieldName}
          onChange={(e)=>setfieldName(e.target.value)}
          submit={handleAddField}
          close={()=>setopenaddfield(false)}
          />
        )
      }
    </section>
  )
}

export default ProductAdmin