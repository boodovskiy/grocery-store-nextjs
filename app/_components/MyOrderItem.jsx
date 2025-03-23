import React from 'react'
import Image from "next/image"
import { STRAPI_BASE_URL } from '@/config'

function MyOrderItem({orderItem}) {
  const imageUrl = orderItem.product?.images[0]?.url 
  ? `${STRAPI_BASE_URL}${orderItem.product?.images[0]?.url}`
  : 'https://picsum.photos/200';

  return (
    <div className='grid grid-cols-5 w-[55%] mt-3 mb-3 items-center border-b-2'>
        <Image 
            src={imageUrl} 
            width={80} 
            height={80} 
            alt={orderItem.product?.name ? orderItem.product?.name : 'image'}
            className='bg-gray-100 p-5 rounded-md border'
        />
        <div className='col-span-2'>
            <div>{orderItem.product?.name}</div>
            <div>Item Price: {orderItem.product?.mrp}</div>
        </div>
        <div>Quantity: {orderItem.quantity}</div>
        <div>Price: {orderItem.price}</div>
    </div>
  )
}

export default MyOrderItem