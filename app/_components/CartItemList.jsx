import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { STRAPI_BASE_URL } from '@/config'
import { TrashIcon } from 'lucide-react'

function CartItemList({items, onDeleteItem}) {
    

  return (
    <div>
        <div className='h-[500px] overflow-auto'>
            {items.map((item, index) => (
                <div key={index} className='flex justify-between items-center p-2 mb-5'>
                    <div className='flex gap-6 items-center'>
                        <Image src={STRAPI_BASE_URL + item.image} width={90} height={90} alt={item.name}
                            className='border p-2'
                        />
                        <div>
                            <div className='font-bold'>{item.name}</div>
                            <div>Quantity: {item.quantity}</div>
                            <div className='font-bold text-lg'>$ {item.amount}</div>
                        </div>
                    </div>
                    <TrashIcon onClick={() => onDeleteItem(item.document_id)} className='cursor-pointer'/>
                </div>
            ))}
        </div>

    </div>
  )
}

export default CartItemList