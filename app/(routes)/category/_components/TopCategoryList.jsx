import { STRAPI_BASE_URL } from '@/config'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const TopCategoryList = ({categoryList}) => {
  return (
    <div className='flex gap-5 mt-2 overflow-auto mx-7 md:mx-20 justify-center'>
        {categoryList.map((category, index) => (
            <Link href={'/category/'+ category.name}
                className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group cursor-pointer hover:bg-green-600 w-[150px] min-w-[100px]'
                key={index}
            >
                <Image src={STRAPI_BASE_URL + category.icon?.url}
                    width="50"
                    height="50"
                    alt="icon"
                    className='group-hover:scale-125 transition-all ease-in-out'
                />
                <h2 className='text-green-800'>{category.name}</h2>
            </Link>
        ))}
     </div>
  )
}

export default TopCategoryList