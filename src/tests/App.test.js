import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import App, { DEFAULT_INGREDIENT_SEARCH } from '../App';

/**
 * Testing App for component hook ups and reaction to user input
 */

/**
 * This is an important test because it ensures correctness of the assignment - "return all products containing Organic Banana"
 * Without this functionality, the app would spin up with an empty input, and although the search would be functional, it would be technically incorrect for the assignment 
 */
test('render the input with the default value of DEFAULT_INGREDIENT_SEARCH (Organic Banana)', () => {
  const { getByLabelText } = render(<App />);
  const input = getByLabelText('ingredient-search')
  expect(input.value).toEqual(DEFAULT_INGREDIENT_SEARCH)
});

/**
 * In addition to rendering an input with a value, we should also be rendering the resulting list of products
 */
test('render the resulting products from the default search', () => {
  const { getByLabelText } = render(<App />);
  const productList = getByLabelText('product-list') // get's the <ul> by aria-label
  expect(productList.children.length).toEqual(4) // <ul> should have 4 children, 1 for each matching product
})

/**
 * Main functionality test
 * Here, we spin up the app, and simulate a user typing by invoking the onChange handler of the input
 */
test('render the resulting products when the value on the input changes', async () => {
  const { getByLabelText } = render(<App />)

  // simulate user search by triggering input onChange listener
  await act(async () => {
    const input = getByLabelText('ingredient-search') // gets the <input> by aria-label
    fireEvent.change(input, { target: { value: 'Organic Blueberry' } })

    // for updates to component to be complete because of our artifical delay
    await new Promise(resolve => setTimeout(resolve, 1000))
  })

  // get the new product list now that it's been re-rendered to the screen
  const productList = getByLabelText('product-list')
  expect(productList.children.length).toEqual(2) // expect 2 because there are 2 products that contain "Organic Blueberry"
});

/**
 * Additional functionality test similar to the previous one
 * except here, we will simulate the user searching for something with no results (like Apples)
 */
test('render the resulting products when the value on the input changes', async () => {
  const { getByLabelText, getByText } = render(<App />)

  // simulate user search by triggering input onChange listener
  await act(async () => {
    const input = getByLabelText('ingredient-search') // gets the <input> by aria-label
    fireEvent.change(input, { target: { value: 'Apples' } })

    // for updates to component to be complete because of our artifical delay
    await new Promise(resolve => setTimeout(resolve, 1000))
  })

  // get the new product list now that it's been re-rendered to the screen
  const noResultsDiv = getByText('Sorry! Looks like we are fresh out of')
  expect(noResultsDiv).toBeDefined()
});


