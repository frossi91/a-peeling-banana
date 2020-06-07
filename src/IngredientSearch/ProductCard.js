import React, { useState, useEffect } from 'react'
import { Row } from 'react-grid-system'
import includes from 'lodash/includes'
import { getIngredientById, getImageUrlByProductId } from '../resolvers/ingredient-search'

/**
 * 
 * props {
 *   products: [Product],
 *   searchValue: String
 * } 
 * 
 * ProductCard is a simple Card style Component that displays an image of the product (pulled from your website)
 * The Product Name
 * The Products list of Ingredients (matching serch terms are bolded)
 */
function ProductCard ({ product, searchValue }) {
  const [imageUrl, setImageUrl] = useState('') // intialize image url state

  useEffect(() => { // hook for grabbing the url, listening to product for changes
    const _imageUrl = getImageUrlByProductId(product.id)
    setImageUrl(_imageUrl)
  }, [product])


  /**
   * Builder function responsible for building the bolded ingredient text for search match
   * @param { id: Int, name: String, is_allergen: Boolean } ingredient 
   * @param String searchValue 
   */
  const buildBoldedIngredient = (ingredient) => {
    let ingredientName = ingredient.name.trim() // trimming this just in case there is bad data in the DB
    let _searchValue = searchValue.trim() // trim the input from the user

    const startIndex = ingredientName.toLowerCase().indexOf(_searchValue.trim().toLowerCase()) // find the starting index of the searchValue in the ingredient name
    const endIndex = startIndex + _searchValue.length // find the endIndex by adding the length of the searchValue string

    const prefixedText = ingredientName.substring(0, startIndex) // create a substring for any potential characters before the match
    const boldedText = ingredientName.substring(startIndex, endIndex) // create a substring that is characters that match the search and thus should be bold
    const postText = ingredientName.substring(endIndex, ingredientName.length) // create a substring for any potential characters after the match

    // return the combined text
    return (
      <li className='IngredientListItem' key={`ingredient-${ingredient.id}`}>
        <span>{prefixedText}<b>{boldedText}</b>{postText}</span>
      </li>
    )
  }

  /**
   * Builder function to build the list items to display the products ingredients
   * @param { id: Int, name: String, collection: String, ingredient_ids: [Int], matchingIngredientIds: [Int] } product 
   */
  const buildIngredientListItems = () => {
    return product.ingredient_ids.map(ingredientId => { // loop over products ingredients
      const ingredient = getIngredientById(ingredientId) // get the ingredient by it's id
      
      if (!ingredient) return null // we could not find the given ingredient, skip it for now **come back to this if I have time, shouldn't ever occur since we are dealing with local data files**
      
      if (includes(product.matchingIngredientsIds, ingredientId)) { // check if the current ingredient is in the matching array
        return buildBoldedIngredient(ingredient, searchValue)  // if it is, build bolded <li>
      } else return <li className='IngredientListItem' key={`ingredient-${ingredient.id}`}><span>{ingredient.name}</span></li> // else build regular <li>
    })
  }

  /**
   * Return the constructed card object
   */
  return (
    <li>
      <Row justify='center'>
        <div className="Card">
          <div className='ProductImageContainer'>
            <img className="ProductImage" src={imageUrl} alt="Avatar" />
          </div>
          <div className="CardContainer">
            <span className="ProductName"><b>{ product.name }</b></span>
            <br />
            <ul className="comma-list IngredientList">
              {
                buildIngredientListItems()
              }
            </ul>
          </div>
        </div>
      </Row>
    </li>
  )
}

export default ProductCard