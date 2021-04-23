const apiKey = "JGVijdJBtxpdFTartZW4vlAhjQ0GHXjsSAnFkmZQ";

export const fetchAsteroid = (params) => async () => {
    const req = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${params.id}?api_key=${apiKey}`);
    const response = await req.json();
    return response.close_approach_data;
}


export const setAsteroid = payload => ({
    type: "SET_ITEM",
    payload
})