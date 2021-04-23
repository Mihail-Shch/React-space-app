import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { Loader, AsteroidPageTable, AsteroidMainItem } from '../components'
import { setFetching } from '../redux/actions/asteroids';
import { fetchAsteroid } from '../redux/actions/asteroidPage';


function AsteroidPage({ match }) {

    const params = match.params;

    const asteroid = useSelector(({ asteroidPage }) => asteroidPage.items)

    const [isLoaded, setIsLoaded] = React.useState(false)
    const [asteroidInfo, setAsteroidInfo] = React.useState([])
    const dispatch = useDispatch();

    React.useEffect(() => getDataAboutAsteroid(), [])

    const getDataAboutAsteroid = async () => {
        setAsteroidInfo(await dispatch(fetchAsteroid(params)))
        dispatch(setFetching(false))
        setIsLoaded(true)
    }

    return (
        <div className='container'>
            <h2 className='asteroidPage__title'>Asteroid info</h2>
            <AsteroidMainItem item={asteroid} />
            {
                isLoaded ? <AsteroidPageTable info={asteroidInfo} /> : <Loader />
            }
        </div>
    )
}

export default AsteroidPage
