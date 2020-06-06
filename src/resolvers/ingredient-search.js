/**
 * Putting search logic in it's own file.  Ideally in a production environment, we would aim to do this search serverside with full text search support.
 */
import { products } from '../data/products.json'
import { ingredients } from '../data/ingredients.json'
import find from 'lodash/find'
import reduce from 'lodash/reduce'
import includes from 'lodash/includes'
import filter from 'lodash/filter'
import intersection from 'lodash/intersection'

/**
 * resolveIngredientSearch
 * @param {String} searchTerm 
 * 
 * I decided to make the search function off an "includes" rather than strict equality.
 * This way, we can support partial matches.
 * If a user searches "Organic", they will see all results that contain "organic" anywhere in the ingredient name.
 */
function resolveIngredientSearch(searchTerm) {
  /**
   * sanitize the input by trimming away any trailing spaces
   * lowercase the input for text comparison so our search is case-insensitive
   * technically this is a second trim() since the component already trimed the value on the component side...but wanted to keep this here to simulate a server environment
   */
  const _searchTerm = searchTerm.trim().toLowerCase()
  
  // Early out here for wher the user clears out the input
  if (!_searchTerm) return []
  
  /**
   * First we need to find the IDs of the ingredients that match the serach term
   * Here we reduce the array of ingredient objects down to an array of ingredient IDs that match the search value
   */
  const searchIngredientIds = reduce(ingredients, (result, ingredient) => {
    /**
     * here im checking if the ingredient name includes our search term, remember to lowercase for case-insensitivity
     * if the the includes passes, the ingredient ID is pushed on to the resulting array
     */ 
    if (includes(ingredient.name.toLowerCase(), _searchTerm)) result.push(ingredient.id)
    return result
  }, [])

  /**
   * now that we have an array of ingredient IDs based off the users search,
   * the last thing we need to do is filter the product data for those that included any of the IDs in the searchIngredientIds array
   * if the intersection of product.ingredient_ids and searchResultIngredientIds is greater than 0,
   * it means the product contains at least 1 matching ingredient, so return it in the result.
   */
  const filtered = filter(products, product => {
    // create the intersecting array
    const matchingIngredientsIds = intersection(product.ingredient_ids, searchIngredientIds)

    /**
     * saving off new array on product that represents which ingredients matched the users search
     * I will later leverage this array to bolden the matching serch term in the UI
     */ 
    product.matchingIngredientsIds = matchingIngredientsIds

    // return boolean to indicate if product should be included in filter
    return matchingIngredientsIds.length > 0
  })

  return filtered
}
export default resolveIngredientSearch

/**
 * getIngredientById
 * @param {Int} ingredientId 
 * get the ingredient object by its ID
 */
export const getIngredientById = (ingredientId) => {
  return find(ingredients, (ingredient) => ingredient.id === ingredientId)
}