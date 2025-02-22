import { Button } from '@/components/ui/button'
import { STRAPI_BASE_URL } from '@/config'
import { ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ProductItemDetail = ({product}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black'>
      <Image src={STRAPI_BASE_URL + product.images[0]?.url}
        alt='image'
        width={300}
        height={300}
        className='bg-slate-200 p-5 w-[300px] h-[300px] object-contain rounded-lg'
      />
      <div className='flex flex-col gap-3'>
        <h2 className='text-2xl font-bold'>{product.name}</h2>
        <div className='text-sm text-gray-500'>{product.description}</div>
        <div className='flex gap-3'>
            {product.sellingPrice &&
                <h2 className='font-bold text-3xl'>${product.sellingPrice}</h2>
            }
            <h2 className={`font-bold text-3xl ${product.sellingPrice && 'line-through text-gray-500'}`}>${product.mrp}</h2>
        </div>
        <h2 className='font-medium text-lg'>Quantity ({product.itemQuantityType})</h2>
        <div className='flex flex-col items-baseline gap-3'>
          <div className='p-2 border flex gap-10 items-center px-5'>
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </div>
          <Button className="flex gap-3">
            <ShoppingBasket />
            Add to Cart
          </Button>
        </div>
        <div><span className='font-bold'>Category:</span> {product.categories[0].name}</div>
      </div>
    </div>
  )
}

export default ProductItemDetail