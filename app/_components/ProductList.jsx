import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({productList}) => {
  return (
    <div>
        <h2 className='text-green-600 font-bold text-2xl'>Our Popular Products</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {productList.map((product, index)=> index<8 && (
                <ProductItem product={product} key={product.id || index} />
            ))}
        </div>
    </div>
  )
}

export default ProductList