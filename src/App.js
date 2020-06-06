import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-grid-system';
import includes from 'lodash/includes'
import logo from './assets/daily-harvest-logo.jpg'
import resolveIngredientSearch, { getIngredientById } from './resolvers/ingredient-search'
import './App.css'

const DEFAULT_INGREDIENT_SEARCH = 'Organic Banana'
const DEFAULT_PLACEHOLDER_TEXT = 'Hungry for ...'

function ProductList ({ products, searchValue }) {
  const buildBoldedIngredient = (ingredient, searchValue) => {
    let ingredientName = ingredient.name.trim()
    // find the index of the search value, this way we can bold the partial results
    const startIndex = ingredientName.toLowerCase().indexOf(searchValue.trim().toLowerCase())
    const endIndex = startIndex + searchValue.length
    const prefixedText = ingredientName.substring(0, startIndex)
    const boldedText = ingredientName.substring(startIndex, endIndex)
    const postText = ingredientName.substring(endIndex, ingredientName.length)
    return (
      <li style={{textAlign: 'left'}}>
        <span>{prefixedText}<b>{boldedText}</b>{postText}</span>
      </li>
    )
  }
  const buildIngredientList = (product) => {
    return product.ingredient_ids.map(ingredientId => {
      const ingredient = getIngredientById(ingredientId)
      if (includes(product.matchingIngredientsIds, ingredientId)) {
        return buildBoldedIngredient(ingredient, searchValue)
        // return <li style={{textAlign: 'left'}}>{ingredient.name}</li>
      } else return <li style={{textAlign: 'left'}}>{ingredient.name}</li>
    })
  }
  const productNames = products.map(product => {
    const ingredientList = buildIngredientList(product)
    return (
      <li>
        <div style={{textAlign: 'left', fontWeight: 'bold'}}> 
          <span>{product.name}</span>
        </div>
        <ul>
          {ingredientList}
        </ul>
      </li>
    )
  })
  return (
    <ul>
      {productNames}
    </ul>
  )
}

function IngredientSearch () {
  const [searchValue, setSearchValue] = useState(DEFAULT_INGREDIENT_SEARCH)
  const [searchResults, setSearchResults] = useState([])
  
  useEffect(() => {
    const _searchResults = resolveIngredientSearch(searchValue)
    setSearchResults(_searchResults)
  }, [searchValue])

  const handleInputChange = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <div>
      <Row>
        <input className="Search-input" placeholder={DEFAULT_PLACEHOLDER_TEXT} value={searchValue} type='search' onChange={handleInputChange}></input>
      </Row>
      <Row>
        <ProductList products={searchResults} searchValue={searchValue} />
      </Row>
    </div>
  )
}

function App() {
  return (
    <Container>
      <Row>
        <Col sm={1}></Col>
        <Col sm={10}>
          <div className="App">
            <Row>
              <img style={{width: '100%'}} src={logo} className="App-logo" alt="logo" />
            </Row>
            <IngredientSearch />
          </div>
        </Col>
        <Col sm={1}></Col>
      </Row>
    </Container>
  );
}

export default App
