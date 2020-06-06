import './App.css'
import React from 'react'
import { Container, Row, Col } from 'react-grid-system';
import includes from 'lodash/includes'
import logo from './assets/daily-harvest-logo.jpg'
import { getIngredientById } from './resolvers/ingredient-search'

import IngredientSearch from './IngredientSearch'

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
        <Col xs={1} sm={3} lg={4}></Col>
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
