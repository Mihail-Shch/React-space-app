const initialState = {
    items: []
}

const asteroidPage = (state = initialState, action) => {
    if (action.type === "SET_ITEM") {
        return {
            ...state,
            items: action.payload
        }
    }

    return state
}

export default asteroidPage;