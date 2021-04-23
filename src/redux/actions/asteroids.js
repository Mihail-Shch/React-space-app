const date = new Date();
const year = date.getUTCFullYear();

const apiKey = "JGVijdJBtxpdFTartZW4vlAhjQ0GHXjsSAnFkmZQ";

const checkDate = (el) => {
    return el < 10 ? `0${el}` : el
}   

export const fetchAsteroids = (startDay, startMonth) => async (dispatch) => {

    const lastDay = new Date(year, startMonth, 0).getDate();

    const req = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${year}-${checkDate(startMonth)}-${checkDate(startDay)}&end_date=${year}-${checkDate(startMonth)}-${checkDate(startDay)}&api_key=${apiKey}`);
        const { near_earth_objects } = await req.json();

        const orderedArr = {};

        Object.keys(near_earth_objects).sort().forEach(function (key) {
            orderedArr[key] = near_earth_objects[key];
        });

        const arr = Object.values(orderedArr).flat();

        const modifiedArr = arr.map(item => ({
            id: item['id'],
            name: item['name'],
            dangerous: item['is_potentially_hazardous_asteroid'],
            size: Math.round(item['estimated_diameter']['meters']['estimated_diameter_max']),
            distanceKM: Math.round(item['close_approach_data'][0].miss_distance.kilometers),
            distanceLUNAR: Math.round(item['close_approach_data'][0].miss_distance.lunar),
            date: item['close_approach_data'][0].close_approach_date,
        }))

        dispatch(setAsteroids(modifiedArr))

        if (startDay !== lastDay) {
            dispatch(setStartDay(startDay + 1))
        } else if (startDay === lastDay) {
            dispatch(setStartDay(1))
            dispatch(setStartMonth(startMonth + 1))
        }
        dispatch(setFetching(false))
}
        
export const setFetching = payload => ({
    type: "SET_FETCHING",
    payload
})

export const setAsteroids = items => ({
    type: "SET_ASTEROIDS",
    payload: items
})

export const setStartDay = payload => ({
    type: "SET_START_DAY",
    payload
})

export const setStartMonth = payload => ({
    type: "SET_START_MONTH",
    payload
})

