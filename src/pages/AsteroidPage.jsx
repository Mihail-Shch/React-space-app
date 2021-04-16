import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { Header, Loader, AsteroidPageTable, AsteroidPageItem } from '../components'
import { setFetching } from '../redux/actions/asteroids';


const apiKey = "JGVijdJBtxpdFTartZW4vlAhjQ0GHXjsSAnFkmZQ";

function AsteroidPage({ match }) {

    const asteroid = useSelector(({ asteroidPage }) => asteroidPage.items)

    const [isLoaded, setIsLoaded] = React.useState(false)
    const [asteroidInfo, setAsteroidInfo] = React.useState([])
    const dispatch = useDispatch();

    const params = match.params;

    React.useEffect(() => getDataAboutAsteroid(), [])



    const getDataAboutAsteroid = async () => {
        const req = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${params.id}?api_key=${apiKey}`);
        const response = await req.json();

        setAsteroidInfo(response)
        dispatch(setFetching(false))
        setIsLoaded(true)
    }

    return (
        <div className='container'>
            <Header />
            <h2 className='asteroidPage__title'>Asteroid info</h2>
            <AsteroidPageItem asteroid={asteroid} />
            {
                isLoaded ? <AsteroidPageTable item={asteroidInfo} /> : <Loader />
            }
            <footer className="footer">
                <p className="footer__rights">2021 &copy; Все права и планета защищены</p>
            </footer>
        </div>
    )
}

export default AsteroidPage
