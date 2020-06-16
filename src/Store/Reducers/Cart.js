const INITAL_STATE = JSON.parse(localStorage.getItem('cart')) || []

const Cart = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case 'change_cart_data':
      state = action.Cart
      localStorage.setItem('cart', JSON.stringify(state))
      return state
    case 'add_product_to_cart':
      state = [...state, action.product]
      localStorage.setItem('cart', JSON.stringify(state))
      return state
    case 'remove_product_from_cart':
      if (state.findIndex(x => x.id === action.id) > -1) {
        state.splice(state.findIndex(x => x.id === action.id), 1)
        localStorage.setItem('cart', JSON.stringify(state))
        state = [...state]
      }
      return state
    default:
      return state
  }
}

export default Cart