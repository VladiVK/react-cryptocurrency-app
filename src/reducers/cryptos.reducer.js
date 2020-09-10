
const cryptosReducer = (state,action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                loading: false,
                error: false,
                cryptos: [...action.payload]
            }
        case 'FETCH_ERROR':
            return {
                loading: false,
                error: 'Something went wrong!',
                cryptos: state
            }
        default:
            return state
    }
}
export default cryptosReducer