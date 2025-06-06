import React from 'react'
import { Link } from 'react-router-dom'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { PricewithDiscount } from '../utils/PricewithDiscount'
import { ValideURLConvert } from '../utils/ValidURLConvert'
// import AddToCartButton from './AddToCartButton'

const Cardproduct = ({data}) => {
    const url = `/Product/${ValideURLConvert(data.name)}-${data._id}`
  
  return (
    <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white' >
      <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
            <img 
                src={data.image[0]}
                className='w-full h-full object-scale-down lg:scale-125'
            />
      </div>
      <div className='flex items-center gap-1'>
        <div className='rounded text-xs w-fit p-[1px] px-2 text-green-600 bg-green-50'>
              10 min 
        </div>
        <div>
            {
              Boolean(data.discount) && (
                <p className='text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full'>{data.discount}% discount</p>
              )
            }
        </div>
      </div>
      <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
        {data.name}
      </div>
      <div className='w-fit gap-3 px-2 lg:px-0 text-sm lg:text-base'>
        {data.unit} 
        Unit
      </div>

      <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
        <div className='flex items-center gap-1'>
          <div className='font-semibold'>
              {DisplayPriceInRupees(PricewithDiscount(data.price,data.discount))} 
          </div>
          
          
        </div>
        <button className='bg-green-500 px-4 py-1 rounded-md'>Add</button>
      </div>

    </Link>
  )
}

export default Cardproduct
