import { CheckCircle2 } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const OrderConfirmation = () => {
  return (
    <div className='flex justify-center my-20'>
        <div className="border shadow-md flex flex-col justify-center p-20 rounded-md items-center gap-3 px-32">
            <CheckCircle2 className='h-24 w-24 text-primary'/>
            <h2 className="font-medium text-3xl text-primary">Order Successfull</h2>
            <p className='font-medium text-2xl'>Thank you so much for order</p>
            <Link href="/my-order" passHref><Button className="mt-8">Track your order</Button></Link>
        </div>
    </div>
  )
}

export default OrderConfirmation