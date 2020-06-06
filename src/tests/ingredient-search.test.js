import resolveIngredientSearch from '../resolvers/ingredient-search'

/**
 * Testing search algorithm for correctness
 */
test('should not return a result for "Apple" (because there is none in the dataset)', () => {
  const products = resolveIngredientSearch('Apple');
  expect(products.length).toEqual(0);
});

test('should return results for "Organic Banana"', () => {
  const products = resolveIngredientSearch('Organic Banana')
  expect(products.length).toEqual(4)
  for (const product of products) { // loop over each product and check it includes ID for Organic Banana
    expect(product.ingredient_ids).toContain(3) // 3 is the ID for Organic Banana
  }
})

test('should return a parital match for "Banana"', () => {
  const products = resolveIngredientSearch('Banana')
  expect(products.length).toEqual(4)
  for (const product of products) { // loop over each product and check it includes ID for Organic Banana
    expect(product.ingredient_ids).toContain(3) // 3 is the ID for Organic Banana
  }
})

test('should not matter if there are any leading or trailing spaces', () => {
  const products = resolveIngredientSearch('       Organic Banana     ')
  expect(products.length).toEqual(4)
  for (const product of products) { // loop over each product and check it includes ID for Organic Banana
    expect(product.ingredient_ids).toContain(3) // 3 is the ID for Organic Banana
  }
})

test('should be case insensitive', () => {
  const products = resolveIngredientSearch('ORGANIC banana')
  expect(products.length).toEqual(4)
  for (const product of products) { // loop over each product and check it includes ID for Organic Banana
    expect(product.ingredient_ids).toContain(3) // 3 is the ID for Organic Banana
  }
})
