import { LayoutGrid, Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='p-5 shadow-md'>
        <div className='flex items-center gap-8'>
            <Image 
                src='/logo.png'
                alt="grocery store"
                width={150}
                height={100}
            />
             <h2 className='flex gap-2 items-center borderd rounded-full p-2 px-10 bg-slate-200'><LayoutGrid className='h-5 w-5'/> Category</h2>
            <div className='md:flex gap-3 items-center border rounded-full p-2 px-5 hidden'>
                <Search />
                <input type='text' placeholder='Search' className='outline-none'/>
            </div>
        </div>
           
    </div>
  )
}

export default Header