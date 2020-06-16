const INITAL_STATE = []

const Products = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case 'change_product_data':
      return action.Products
    default:
      return state
  }
}

export default Products