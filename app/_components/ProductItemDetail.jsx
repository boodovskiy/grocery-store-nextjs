"use client"
import { Button } from '@/components/ui/button'
import { STRAPI_BASE_URL } from '@/config'
import { ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'


const ProductItemDetail = ({product}) => {
  const jwt = sessionStorage.getItem('jwt')
  const user = JSON.parse(sessionStorage.getItem('user'))
  const [productTotalPrice, setProductTotalPrice] = useState(product.sellingPrice ? product.sellingPrice : product.mrp)
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()

  const addToCart = () => {
    if (!jwt)  { 
      router.push('/sign-in'); 
      return; 
    } 

    const data = {
      data: {
        quantity: quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: [{id: product.id}],
        users_permissions_user: user.id,
      }
    }

    console.log(data)

    GlobalApi.addToCart(data, jwt).then(resp=>{
      console.log('Response:', resp.data);
      toast('Added to Cart!');
      
    }, (e) => {
      console.error('Error:', error.response?.data || error.message);
      toast('Error while adding into cart.');
    })
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black'>
      <Image src={STRAPI_BASE_URL + product.images[0]?.url}
        alt='image'
        width={300}
        height={300}
        className='bg-slate-200 p-5 w-[300px] h-[300px] object-contain rounded-lg'
      />
      <div className='flex flex-col gap-3'>
        <div className='text-2xl font-bold'>{product.name}</div>
        <div className='text-sm text-gray-500'>{product.description}</div>
        <div className='flex gap-3'>
            {product.sellingPrice &&
                <h2 className='font-bold text-3xl'>${product.sellingPrice}</h2>
            }
            <h2 className={`font-bold text-3xl ${product.sellingPrice && 'line-through text-gray-500'}`}>${product.mrp}</h2>
        </div>
        <h2 className='font-medium text-lg'>Quantity ({product.itemQuantityType})</h2>
        <div className='flex flex-col items-baseline gap-3'>
          <div className="flex gap-3 items-center">
            <div className='p-2 border flex gap-10 items-center px-5'>
              <button disabled={quantity==1} onClick={()=>setQuantity(quantity-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={()=>setQuantity(quantity+1)}>+</button>
            </div>
            <div className='text-2xl font-bold'> = ${(quantity * productTotalPrice).toFixed(2)}</div>
          </div>
          <Button className="flex gap-3" onClick={()=>addToCart()}>
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