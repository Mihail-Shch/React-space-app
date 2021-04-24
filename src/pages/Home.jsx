import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Loader, SortDanger, SortDistance, AsteroidMainItem } from '../components'

import { setFetching, fetchAsteroids } from '../redux/actions/asteroids';

function Home() {
    const [activeDistance, setActiveDistance] = React.useState(0);
    const [isDanger, setIsDanger] = React.useState(false);

    const dispatch = useDispatch();

    const { fetching, startDay, startMonth, items } = useSelector(({ asteroids }) => asteroids);

    const onClickDistance = (num) => {
        setActiveDistance(num)
    }

    React.useEffect(() => {
        if (fetching) {
            dispatch(fetchAsteroids(startDay, startMonth))
        }
    }, [fetching])

    React.useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            dispatch(setFetching(true))
        }
    }

    const setDanger = () => {
        setIsDanger(!isDanger)
    }

    const renderItems = isDanger ? items.filter(item => item.dangerous) : items;

    return (
        <div className='wrapper'>
            <section className="content">
                <div className="container">
                    <div className="content__vidgets">
                        <SortDanger onClickDanger={setDanger} />
                        <SortDistance onClickDistance={onClickDistance} activeDistance={activeDistance} />
                    </div>
                    <div className="content__asteroids">
                        {
                            renderItems.map(item =>
                                <Link to={`/asteroid/${item.id}`} key={`${item.name} + ${item.size}`}>
                                    <AsteroidMainItem
                                        item={item}
                                        activeDistance={activeDistance}
                                    />
                                </Link>)
                        }
                    </div>
                </div>
                {
                    fetching ? <Loader /> : ''
                }
            </section >
        </div>
    )
}

export default Home
