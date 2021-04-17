const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;

const initialState = {
    items: [],
    fetching: true,
    startDay: day,
    startMonth: month
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
        case "SET_START_MONTH":
            return {
                ...state,
                startMonth: action.payload
            }
        default: return state
    }
}

export default asteroids;