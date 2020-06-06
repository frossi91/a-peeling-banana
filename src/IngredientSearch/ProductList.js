import React from 'react'
import includes from 'lodash/includes'
import { getIngredientById } from '../resolvers/ingredient-search'
/**
 * 
 * props {
 *   products: [Product],
 *   searchValue: String,
 *   loading: Boolean
 * } 
 * 
 * ProductList component is responsible for display a list of products.
 * It is fed an array of products to display in a list style fasion
 * It is also fed the users searchValue so it can bolden the matching search term
 */
function ProductList ({ products, searchValue }) {

  /**
   * Builder function responsible for building the bolded ingredient text for search match
   * @param { id: Int, name: String, is_allergen: Boolean } ingredient 
   * @param String searchValue 
   */
  const buildBoldedIngredient = (ingredient, searchValue) => {
    let ingredientName = ingredient.name.trim() // trimming this just in case there is bad data in the DB
    let _searchValue = searchValue.trim() // trim the input from the user

    const startIndex = ingredientName.toLowerCase().indexOf(_searchValue.trim().toLowerCase()) // find the starting index of the searchValue in the ingredient name
    const endIndex = startIndex + _searchValue.length // find the endIndex by adding the length of the searchValue string

    const prefixedText = ingredientName.substring(0, startIndex) // create a substring for any potential characters before the match
    const boldedText = ingredientName.substring(startIndex, endIndex) // create a substring that is characters that match the search and thus should be bold
    const postText = ingredientName.substring(endIndex, ingredientName.length) //create a substring for any potential characters after the match

    // return the combined text
    return (
      <li key={`ingredient-${ingredient.id}`} className="Left">
        <span>{prefixedText}<b>{boldedText}</b>{postText}</span>
      </li>
    )
  }

  /**
   * Builder function to build the list items to display the products ingredients
   * @param { id: Int, name: String, collection: String, ingredient_ids: [Int], matchingIngredientIds: [Int] } product 
   */
  const buildIngredientListItems = (product) => {
    return product.ingredient_ids.map(ingredientId => { // loop over product.ingredient_ids
      const ingredient = getIngredientById(ingredientId) // get the ingredient by it's id
      
      if (!ingredient) return null // we could not find the given ingredient, skip it for now **come back to this if I have time**
      
      if (includes(product.matchingIngredientsIds, ingredientId)) { // check if the current ingredient is in the matching array
        return buildBoldedIngredient(ingredient, searchValue)  // if it is, build bolded <li>
      } else return <li key={ingredientId} className="Left">{ingredient.name}</li> // else build regular <li>
    })
  }
  
  /**
   * build an array of <li> to be fed into the parent <ul>
   * each <li> is represents a product
   * each product has it's own inner <ul> for it's ingredients
   */
  const productListItems = products.map(product => {
    return (
      <li key={`product-${product.id}`}>
        <span>{product.name}</span> {/* display the product name */}
        <ul>
          {buildIngredientListItems(product)} {/* build the <li>s for the ingredient list */}
        </ul>
      </li>
    )
  })

  // return the enture <ul> and it's child <li>s
  return (
    <ul aria-label='product-list'>
      {productListItems}
    </ul>
  )
}

export default ProductList
