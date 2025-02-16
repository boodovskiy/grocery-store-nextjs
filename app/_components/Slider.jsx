import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import Image from 'next/image'
import React from 'react'

const Slider = ({sliderList}) => {
    const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL

  return (
    <Carousel>
        <CarouselContent>
            {sliderList.map((slider, index)=>(
                <CarouselItem key={index}>
                    <Image src={baseURL + slider.image?.url}
                        width={1000}
                        height={400}
                        alt='slider'
                        className='w-full h-[200px] md:h-[400px] object-cover rounded-2xl'
                        // unoptimized={true}
                    />
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
  )
}

export default Slider