import React, { memo } from 'react'
import isEqual from 'lodash'
import ProductCard from './ProductCard'
/**
 * 
 * props {
 *   products: [Product],
 *   searchValue: String
 * } 
 * 
 * ProductList component is responsible for displaying a list of products.
 * It is fed an array of products to display
 * It creates a bunch of ProductCard components and renders them in a simple list
 */
function ProductList ({ products, searchValue }) {
  /**
   * Build an array of <ProductCards> to be fed into the parent <ul>
   * Each ProductCard represents a product
   */
  const productListItems = products.map(product => {
    return <MemoizedProductCard key={`product-${product.id}`} product={product} searchValue={searchValue} />
  })

  // return the enture <ul> and it's child product <li>s
  return (
    <ul className="ProductList" aria-label='product-list'>
      {productListItems}
    </ul>
  )
}

const MemoizedProductCard = memo(ProductCard, (prevProps, nextProps) => {
  return isEqual(prevProps.product, nextProps.product)
})

export default ProductList
