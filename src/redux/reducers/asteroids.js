const date = new Date();
const day = date.getDate()

const initialState = {
    items: [],
    fetching: true,
    startDay: day
}

const asteroids = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ASTEROIDS":
            return {
                ...state,
                items: [...state.items, action.payload].flat()
            };
        case "SET_FETCHING":
            return {
                ...state,
                fetching: action.payload
            }
        case "SET_START_DAY":
            return {
                ...state,
                startDay: action.payload
            }
        default: return state
    }
}

export default asteroids;