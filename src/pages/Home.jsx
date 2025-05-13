import React from 'react'
import banner from "../assets/banner.jpg";
import bannermobile from "../assets/banner-mobile.jpg"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Categorywiseproductdisplay from './Categorywiseproductdisplay';
const Home = () => {

  const loadingcategory = useSelector(state => state.product.loadingcategory)
  const allcategory =  useSelector(state => state.product.allCategory)
  const SubcategoryData =  useSelector(state => state.product.allSubCategory)
  const Navigate = useNavigate()

  const handleredirectproductlistpage = (id,name) => {
    const subcategory = SubcategoryData.find((subcat) => {
      // console.log("Subcategory",subcat);
      // Check if the subcategory has a category with the given id
      const filterdata = subcat.Category.some((cat) => {
        return cat._id == id
      })
       return filterdata ? true : null
    })
    const url = `/${name.replaceAll(" ","-")}-${id}/${subcategory.name}-${subcategory._id}`
    Navigate(url)
    console.log("Url",url);  
  }
  return (
    <div>
      <div className='container mx-auto'>
        <img 
          src={banner}
           className='w-full h-full hidden lg:block'
           alt='banner'
        />
       <img 
          src={bannermobile}
           className='w-full h-full lg:hidden'
           alt='banner'
        />
      </div>
      <div>
        <p className='pl-8 font-bold py-5'>All Category</p>
      </div>
    <div className='container mx-auto px-4 py-2 grid grid-cols-4 md:grid-cols-4 lg:grid-cols-10 gap-5  ' >
      {
            loadingcategory ? (
              new Array(12).fill(null).map((c,index)=>{
                return(
                   <div key={index+"catalog"} className='bg-white rounded p-4 min-h-36 grid gap-2 animate-pulse '>
                   <div className='bg-blue-100 min-h-20'></div>
                   <div className='bg-blue-100 h-8'></div> 
                  
                  </div>
                )
              })
            ):(
              allcategory.map((cat , index)=>{
                return(
                  <div key={index+"productlistpage"}   onClick={()=>handleredirectproductlistpage(cat._id,cat.name)}      >
                    <img 
                    src={cat.image}
                    className='h-full w-full cursor-pointer'
                    
                    />
                    </div>
                )
              })
            )


     
      }
      </div>

      
      <div>
          {
            allcategory.map((cat , index)=>{
              return(
                <div key={cat._id} >
                 <Categorywiseproductdisplay  id={cat._id} name={cat.name} />
                  </div>
              )
            })
          }
      </div>

       </div>
  )
}

export default Home