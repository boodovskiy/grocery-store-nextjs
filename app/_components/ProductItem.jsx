import { Button } from '@/components/ui/button'
import { STRAPI_BASE_URL } from '@/config'
import Image from 'next/image'
import React from 'react'

const ProductItem = ({product}) => {
  return (
    <div className='p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg'>
        <Image src={STRAPI_BASE_URL + product.images[0]?.url}
            width={500}
            height={200}
            alt={product.name}
            className='h-[200px] w-[200px]'
        />
        <h2 className='font-bold text-lg'>{product.name}</h2>
        <h2 className='font-bold'>${product.mrp}</h2>
        <Button variant='outline'
            className="text-primary hover:text-white hover:bg-primary"
        >
            Add to cart
        </Button>
    </div>
  )
}

export default ProductItem