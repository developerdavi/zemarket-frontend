const INITAL_STATE = { logged: false }

const Account = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case 'change_account_data':
      return action.Account
    default:
      return state
  }
}

export default Account