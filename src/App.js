import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from 'react-grid-system';
import includes from 'lodash/includes'
import debounce from 'lodash/debounce'
import logo from './assets/daily-harvest-logo.jpg'
import resolveIngredientSearch, { getIngredientById } from './resolvers/ingredient-search'
import './App.css'

const DEFAULT_INGREDIENT_SEARCH = 'Organic Banana'
const DEFAULT_PLACEHOLDER_TEXT = 'Hungry for ...'
const DEFAULT_SIMULATED_NETWORK_DELAY = 250
const DEFAULT_SEARCH_RESULTS = resolveIngredientSearch(DEFAULT_INGREDIENT_SEARCH)

function ProductList ({ products, searchValue, loading }) {

  const buildBoldedIngredient = (ingredient, searchValue) => {
    // trimming this just in case there is bad data in the DB
    let ingredientName = ingredient.name.trim()
    // find the index of the search value, this way we can bold the partial results
    const startIndex = ingredientName.toLowerCase().indexOf(searchValue.trim().toLowerCase())
    const endIndex = startIndex + searchValue.length

    const prefixedText = ingredientName.substring(0, startIndex)
    const boldedText = ingredientName.substring(startIndex, endIndex)
    const postText = ingredientName.substring(endIndex, ingredientName.length)
    return (
      <li key={`ingredient-${ingredient.id}`} className="Left">
        <span>{prefixedText}<b>{boldedText}</b>{postText}</span>
      </li>
    )
  }

  const buildIngredientList = (product) => {
    return product.ingredient_ids.map(ingredientId => {
      const ingredient = getIngredientById(ingredientId)
      if (includes(product.matchingIngredientsIds, ingredientId)) {
        return buildBoldedIngredient(ingredient, searchValue)
      } else return <li key={ingredientId} className="Left">{ingredient.name}</li>
    })
  }

  const productListItems = products.map(product => {
    return (
      <li key={`product-${product.id}`}>
        <span>{product.name}</span>
        <ul>
          {buildIngredientList(product)}
        </ul>
      </li>
    )
  })

  return (
    <ul>
      {productListItems}
    </ul>
  )
}

function IngredientSearch () {
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState(DEFAULT_INGREDIENT_SEARCH)
  const [searchResults, setSearchResults] = useState(DEFAULT_SEARCH_RESULTS)
  
  const delayedSearch = useRef(debounce(async (_searchValue) => {
    // add an artificial delay of 500 ms to simulate a network request
    await new Promise(resolve => setTimeout(resolve, DEFAULT_SIMULATED_NETWORK_DELAY))
    const _searchResults = resolveIngredientSearch(_searchValue)
    setSearchResults(_searchResults)
    setLoading(false)
  }, 300, {trailing: true})).current

  const handleInputChange = (e) => {
    setLoading(true) // setting loading to true here to account for the debounce time as well as simulated network time
    setSearchValue(e.target.value)
    delayedSearch(e.target.value.trim())
  }

  const getLoadingOrNoResults = () => {
    if (loading) return <div className="Loader"></div>
    if (searchValue && searchResults.length === 0) {
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

  // still need to debounce
  return (
    <React.Fragment>
      <Row>
        <input className="SearchInput" placeholder={DEFAULT_PLACEHOLDER_TEXT} value={searchValue} type='search' onChange={handleInputChange}></input>
      </Row>
      <Row>
        { 
          loading || searchResults.length === 0 ? getLoadingOrNoResults() : <ProductList products={searchResults} searchValue={searchValue}/>
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
