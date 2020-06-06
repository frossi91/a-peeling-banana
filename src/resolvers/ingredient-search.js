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
 * I decided to make the search work off an includes rather than a strict equality.
 * This way, we can support partial matches.
 * If a use searches "Organic", they will see all results with organic ingredients.
 */

function resolveIngredientSearch(searchTerm) {
  // sanitize the input
  searchTerm = searchTerm.trim().toLowerCase()
  
  // early return for empty string case
  if (!searchTerm) return []
  /**
   * First we need to find the IDs of the ingredients that match the serach term
   */
  const searchIngredientIds = reduce(ingredients, (result, ingredient, key) => {
    if (includes(ingredient.name.toLowerCase(), searchTerm)) result.push(ingredient.id)
    return result
  }, [])

  return filter(products, (product) => {
    /**
     * If the intersection of productIngredientIds and searchResultIngredientIds is greater than 0
     * it means the product contains at least 1 matching ingredient, so return it in the result.
     */
    const matchingIngredientsIds = intersection(product.ingredient_ids, searchIngredientIds)
    product.matchingIngredientsIds = matchingIngredientsIds
    return matchingIngredientsIds.length > 0
  })
}

export const getIngredientById = (ingredientId) => {
  return find(ingredients, (ingredient) => ingredient.id === ingredientId)
}

export default resolveIngredientSearch