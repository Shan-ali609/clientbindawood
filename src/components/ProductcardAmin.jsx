import React from 'react'

const ProductcardAmin = ({data}) => {
  return (
    <div className='w-28 p-4 bg-white ' >
     <div>
        <img 
        src={data.image[0]}
        alt={data.name}
        className='w-full h-full object-scale-down'
        />
           </div>
         <p className='text-ellipsis line-clamp-2 font-medium' >   {data.name} </p>
         <p>   {data.unit} </p>
         
        </div>
 
  )
}

export default ProductcardAmin