import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Header, Loader, SortDanger, SortDistance, AsteroidMainItem } from '../components'

import { setAsteroid } from '../redux/actions/asteroidPage'
import { setFetching, setAsteroids, setStartDay } from '../redux/actions/asteroids';
import { addToCart } from '../redux/actions/cart';


const apiKey = "JGVijdJBtxpdFTartZW4vlAhjQ0GHXjsSAnFkmZQ";

function Home() {
    const [activeDistance, setActiveDistance] = React.useState(0);
    const [isDanger, setIsDanger] = React.useState(false);

    const dispatch = useDispatch();

    const fetching = useSelector(({ asteroids }) => asteroids.fetching)
    const asteroids = useSelector(({ asteroids }) => asteroids.items)
    const startDay = useSelector(({ asteroids }) => asteroids.startDay)


    const onClickDistance = (num) => {
        setActiveDistance(num)
    }

    const setItemForPage = item => {
        dispatch(setAsteroid(item))
    }

    const onClickAddToCart = (e, item) => {
        e.preventDefault()
        dispatch(addToCart(item))
    }

    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getUTCFullYear();


    const endDay = startDay + 1;


    const checkDate = (el) => {
        return el < 10 ? `0${el}` : el
    }

    React.useEffect(() => {
        if (fetching) {
            getData()
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

    const getData = async () => {
        const req = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${year}-${checkDate(month)}-${checkDate(startDay)}&end_date=${year}-${checkDate(month)}-${checkDate(endDay)}&api_key=${apiKey}`);
        const { near_earth_objects } = await req.json();

        const orderedArr = {}

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
        dispatch(setStartDay(startDay + 2))

        dispatch(setFetching(false))
    }

    const setDanger = () => {
        setIsDanger(!isDanger)
    }

    return (
        <div className='wrapper'>
            <Header />
            <section className="content">
                <div className="container">
                    <div className="content__vidgets">
                        <SortDanger onClickDanger={setDanger} />
                        <SortDistance onClickDistance={onClickDistance} activeDistance={activeDistance} />
                    </div>
                    <div className="content__asteroids">
                        {
                            !isDanger ? asteroids.map(item =>
                                <AsteroidMainItem
                                    key={`${item.name} + ${item.size}`}
                                    item={item}
                                    setItemForPage={setItemForPage}
                                    activeDistance={activeDistance}
                                    onClickAddToCart={onClickAddToCart}
                                />) : asteroids.filter(item => item.dangerous === true).map(item =>
                                    <AsteroidMainItem
                                        key={`${item.name} + ${item.size}`}
                                        item={item}
                                        setItemForPage={setItemForPage}
                                        activeDistance={activeDistance}
                                        onClickAddToCart={onClickAddToCart}
                                    />)
                        }
                    </div>
                </div>
                {
                    fetching ? <Loader /> : ''
                }
            </section >
            <footer className="footer">
                <div className="container">
                    <p className="footer__rights">2021 &copy; Все права и планета защищены</p>
                    {/* Текст для прокрутки контента, если при фильтре астероидов их будет < 3 */}
                    <p className="footer__text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Non, qui adipisci vel deleniti sapiente ipsam deserunt corporis voluptatum iure dolorem blanditiis odit accusantium distinctio fuga. 
                    Deleniti dolor vel dignissimos. Eum, ullam rem! Asperiores, itaque sunt modi laborum labore aliquam harum, facere, numquam illo suscipit veniam aliquid debitis. 
                    Possimus optio, ipsam culpa consectetur asperiores laborum unde quam doloremque provident repellat minima, omnis at, molestiae deserunt consequatur labore corporis ratione perferendis. 
                    Dolore distinctio, sed voluptatum numquam sit reprehenderit aut ea eaque sint porro quae vero veritatis suscipit ipsam. 
                    Minus repellat officiis laboriosam magni incidunt perferendis tempora quas dignissimos. Officiis iusto autem neque.</p>
                </div>
            </footer>
        </div>
    )
}

export default Home
