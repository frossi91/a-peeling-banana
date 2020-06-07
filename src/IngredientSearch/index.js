import React, { useState, useRef } from 'react'
import { Row, Col } from 'react-grid-system';
import debounce from 'lodash/debounce'
import resolveIngredientSearch from '../resolvers/ingredient-search'
import ProductList from './ProductList'

export const DEFAULT_INGREDIENT_SEARCH = 'Organic Banana'
export const DEFAULT_PLACEHOLDER_TEXT = 'Hungry for ...'
export const DEFAULT_SIMULATED_NETWORK_DELAY_MILLISECONDS = 100
export const DEFAULT_DEBOUNCE_MILLISECONDS = 300

/**
 * here i am running the search algorithm at bootstrap of the application.
 * this is done only to be technically correct in solving the problem,
 * that is, 'please write a program that returns all of the products that contain the ingredient "Organic Banana"'
 * in a real world scenario, we would probably just initialize the search to be empty
 */
const DEFAULT_SEARCH_RESULTS = resolveIngredientSearch(DEFAULT_INGREDIENT_SEARCH)

/**
 * Main component that drives the search
 * Holds state for loading, user input, and search results
 * Renders and <input> and one of:
 *   loading indicator
 *   a no results message
 *   a <ProductList /> - React Component responsible for displaying a list of products
 */
function IngredientSearch () {
  const [loading, setLoading] = useState(false)  // initialize loading state to false
  const [searchValue, setSearchValue] = useState(DEFAULT_INGREDIENT_SEARCH)  // initialize searchValue state to a default search term
  const [searchResults, setSearchResults] = useState(DEFAULT_SEARCH_RESULTS) // initialize searchResults to the default results that were calculated at bootstrap of app
  
  /**
   * Following block of code defines a function which I store to the variable titled debouncedSearch
   * It is wrapped in a debounce, which makes it so we won't execute the search until the user done typing (currently 300ms)
   * It also adds an artifical delay of DEFAULT_SIMULATED_NETWORK_DELAY to simulate the time it would take to fetch some data from a remote server (currently 100 ms) 
   */
  const debouncedSearch = useRef(debounce(async (_searchValue) => {
    await new Promise(resolve => setTimeout(resolve, DEFAULT_SIMULATED_NETWORK_DELAY_MILLISECONDS)) // artificial delay using Promise + setTimeout
    const _searchResults = resolveIngredientSearch(_searchValue) // do the actual search
    setSearchResults(_searchResults) // set the results to react state
    setLoading(false) // set the loading to false
  }, DEFAULT_DEBOUNCE_MILLISECONDS, {trailing: true})).current

  /**
   * onChange listener for input
   * Sets the searchValue state to what the user typed in the input
   * Invokes a delayedSearch with the trimmed serachValue
   */
  const handleInputChange = (e) => {
    setLoading(true) // setting loading to true here to account for the debounce time as well as simulated network time
    setSearchValue(e.target.value)  // set the searchValue state to the value of the <input>
    debouncedSearch(e.target.value.trim()) // call our network simulated debouncedSearch with the trimmed input
  }

  /**
   * Builder function that returns either:
   *   a loading indicator
   *     or
   *   a message indicating no results
   */
  const buildLoadingOrNoResults = () => {
    if (loading) return <Row><div className="Loader"></div></Row>// if we are loading, then return the loader
    if (searchValue && searchResults.length === 0) { // if loading is false, searchValue is defined (the user has entered text), and the result array is 0, then return a "no results" type of messaging
      return (
        <Row>
          <Col>
            <div araia-label='no-result-div' className="SorryMessage">
              <span>{`Sorry! Looks like we are fresh out of`}</span>
              <br></br>
              <span><i>{`"${searchValue}"`}</i></span>
            </div>
          </Col>
        </Row>
      )
    }
  }

  /**
   * Return JSX
   * Tow Row system
   *   - first row is for the input
   *   - second row is for the loading indicator, <ProductList />, or a "no results" style message
   */
  return (
    <React.Fragment>
      <Row>
        <input aria-label='ingredient-search' className="SearchInput" placeholder={DEFAULT_PLACEHOLDER_TEXT} value={searchValue} type='search' onChange={handleInputChange}></input>
      </Row>
      { 
        loading || searchResults.length === 0 ? buildLoadingOrNoResults() : <ProductList products={searchResults} searchValue={searchValue}/>
      }
    </React.Fragment>
  )
}

export default IngredientSearch