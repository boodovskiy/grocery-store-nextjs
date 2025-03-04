import { Button } from '@/components/ui/button'
import { STRAPI_BASE_URL } from '@/config'
import Image from 'next/image'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogTrigger,
  } from "@/components/ui/dialog"
import ProductItemDetail from './ProductItemDetail'
  

const ProductItem = ({product}) => {
  return (
    <div className='p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg 
        hover:scale-105 hover:shadow-md transition-all ease-in-out cursor-pointer'
    >
        <Image src={STRAPI_BASE_URL + product.images[0]?.url}
            width={500}
            height={200}
            alt={product.name}
            className='h-[200px] w-[200px]'
        />
        <h2 className='font-bold text-lg'>{product.name}</h2>
        <div className='flex gap-3'>
            {product.sellingPrice &&
                <h2 className='font-bold text-lg'>${product.sellingPrice}</h2>
            }
            <h2 className={`font-bold text-lg ${product.sellingPrice && 'line-through text-gray-500'}`}>${product.mrp}</h2>
        </div>

        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline'
                    className="text-primary hover:text-white hover:bg-primary"
                >
                    Add to cart
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Product Details</DialogTitle>
                    <ProductItemDetail product={product} />
                </DialogHeader>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default ProductItem