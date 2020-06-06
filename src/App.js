import React, { useState, useRef } from 'react'
import { Container, Row, Col } from 'react-grid-system';
import includes from 'lodash/includes'
import debounce from 'lodash/debounce'
import logo from './assets/daily-harvest-logo.jpg'
import resolveIngredientSearch, { getIngredientById } from './resolvers/ingredient-search'
import './App.css'

const DEFAULT_INGREDIENT_SEARCH = 'Organic Banana'
const DEFAULT_PLACEHOLDER_TEXT = 'Hungry for ...'
const DEFAULT_SIMULATED_NETWORK_DELAY_MILLISECONDS = 100
const DEFAULT_DEBOUNCE_MILLISECONDS = 300
const DEFAULT_SEARCH_RESULTS = resolveIngredientSearch(DEFAULT_INGREDIENT_SEARCH)

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
    
    const startIndex = ingredientName.toLowerCase().indexOf(searchValue.trim().toLowerCase()) // find the starting index of the searchValue in the ingredient name
    const endIndex = startIndex + searchValue.length // find the endIndex by adding the length of the searchValue string

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
    <ul>
      {productListItems}
    </ul>
  )
}

/**
 * Main component that drives the search
 * holds state for loading, user input, and search results
 * renders and Input and one of:
 *   loading indicator
 *   a no results message
 *   <ProductList /> - React Component responsible for displaying a list of products
 */
function IngredientSearch () {
  const [loading, setLoading] = useState(false)  // initialize loading state to false
  const [searchValue, setSearchValue] = useState(DEFAULT_INGREDIENT_SEARCH)  // initialize searchValue state to a default search term
  const [searchResults, setSearchResults] = useState(DEFAULT_SEARCH_RESULTS) // initialize searchResults default results that were calculated at bootstrap of app
  
  /**
   * following block of code defines a function to be called delayedSearch
   * it wrapped in a debounce so we don't execute the search until the user finishes typing (currently 300ms delay)
   * it also adds an artifical delay of DEFAUL_SIMULATED_NETWORK_DELAY (currently 150 ms) to simulate a call to some remote
   */
  const debouncedSearch = useRef(debounce(async (_searchValue) => {
    await new Promise(resolve => setTimeout(resolve, DEFAULT_SIMULATED_NETWORK_DELAY_MILLISECONDS)) // artificial delay using Promise + setTimeout
    const _searchResults = resolveIngredientSearch(_searchValue) // do the actual search
    setSearchResults(_searchResults) // set the results to react state
    setLoading(false) // set the loading to false
  }, DEFAULT_DEBOUNCE_MILLISECONDS, {trailing: true})).current

  /**
   * change listener for input
   * sets the searchValue state to what the user typed in the input
   * invokes a delayedSearch with the serachValue
   */
  const handleInputChange = (e) => {
    setLoading(true) // setting loading to true here to account for the debounce time as well as simulated network time
    setSearchValue(e.target.value)  // set the searchValue state
    debouncedSearch(e.target.value.trim()) // call our network simulated debouncedSearch with the trimmed input
  }

  /**
   * Builder function that returns loading indicator, or a message indicating no results
   */
  const buildLoadingOrNoResults = () => {
    if (loading) return <div className="Loader"></div> // if we are loading, then return the loader
    if (searchValue && searchResults.length === 0) { // if loading is false, searchValue is defined (the user has entered text), and the result array is 0, then return a "no results" type of messaging
      return (
        <Col>
          <div className="SorryMessage">
            <span>{`Sorry! Looks like we are fresh out of`}</span>
            <br></br>
            <span><i>{`"${searchValue}"`}</i></span>
          </div>
        </Col>
      )
    }
  }

  /**
   * Return JSX
   * Tow Rows
   *   - input for search
   *   - loading indicator || "no results message" || <ProductList />
   */
  return (
    <React.Fragment>
      <Row>
        <input className="SearchInput" placeholder={DEFAULT_PLACEHOLDER_TEXT} value={searchValue} type='search' onChange={handleInputChange}></input>
      </Row>
      <Row>
        { 
          loading || searchResults.length === 0 ? buildLoadingOrNoResults() : <ProductList products={searchResults} searchValue={searchValue}/>
        }
      </Row>
    </React.Fragment>
  )
}


/**
 * Might not be completely necessary for this to be it's own React Component, but in a production environment we might need to do more with the logo like grab a URL from a remote
 */
function AppLogo() {
  return (
    <Row>
      <img className="AppLogo" src={logo} alt="logo" />
    </Row>
  )
}

/**
   * App is built off a simple grid system.  Usually this is provided through an entire UI library suite such as Bootstrap
   * Bringing in something like Bootstrap would give me a lot of stuff I do not need, so I found a nice grid system library to use instead
   * https://github.com/sealninja/react-grid-system
   * 
   * App renders The Daily Harvest logo and a React Component that handles the search and it's results
   * 
   */
function App() { 
  return (
    <Container className='AppContainer' fluid>
      <Row justify='center'>
        {/* gutter */}
        <Col xs={1} sm={3} lg={3}></Col>
        <Col xs={10} sm={6} lg={4}>
          <div>
            <AppLogo />
            <IngredientSearch />
          </div>
        </Col>
        {/* gutter */}
        <Col xs={1} sm={3} lg={4}></Col>
      </Row>
    </Container>
  );
}

export default App
