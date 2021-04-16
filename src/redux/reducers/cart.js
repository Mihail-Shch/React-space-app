const initialState = {
    items: []
}

const cart = (state = initialState, action) => {
    if (action.type === "ADD_TO_CART") {
        return {
            ...state,
            items: [...state.items, action.payload],
        }
    }
    if (action.type === "DELETE_ASTEROID") {
        return {
            ...state,
            items: [action.payload].flat()
        }
    }
    return state
}

export default cart;