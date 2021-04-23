import React from 'react'
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux'

import { setAsteroid } from '../redux/actions/asteroidPage';
import { addToCart, deleteAsteroid } from '../redux/actions/cart';

import dino from '../img/dino.svg';
import { useLocation } from 'react-router';

function AsteroidMainItem({ item, activeDistance }) {

    const location = useLocation();

    const [isAdded, setIsAdded] = React.useState(false)
    const [isLoaded, setIsLoaded] = React.useState(false)

    const dispatch = useDispatch();

    const items = useSelector(({ cart }) => cart.items)

    React.useEffect(() => {
        if (items.length > 0) {
            items.find(obj => obj.id === item.id) ? setIsAdded(true) : setIsAdded(false)
        }
        setIsLoaded(true)
    }, [])

    const setItemForPage = item => {
        dispatch(setAsteroid(item))
    }

    const onClickAddToCart = (e, item) => {
        e.preventDefault()
        dispatch(addToCart(item))
        setIsAdded(true)
    }

    const deleteItemFromCart = (e, item) => {
        e.preventDefault();
        if (global.confirm("Удалить астероид?")) {
            dispatch(deleteAsteroid(items.filter(obj => obj.id !== item.id)))
        }
    }

    return (
        <div>
            {
                isLoaded ? <div className="asteroid__wrapper" onClick={location.pathname !== `/asteroid/${item.id}` ? () => setItemForPage(item) : (e) => e.preventDefault()}>
                    <div className={classNames('content__asteroids-item', 'asteroid', {
                        'green': !item.dangerous,
                        'red': item.dangerous,
                        'small': item.size < 200,
                        'medium': item.size >= 200 && item.size <= 500,
                        'large': item.size > 500
                    })}>
                        {
                            location.pathname === '/cart' ? <div className="asteroid__close" onClick={(e) => deleteItemFromCart(e, item)}>X</div> : ''
                        }
                        <img src={dino} className="asteroid__dino" alt="dino" width="56" height="48" />
                        <div className="asteroid__desc-wrapper">
                            <div className="asteroid__desc">
                                <span className="asteroid__title">{item.name}</span>
                                <div className="asteroid__info asteroid__date">
                                    <span>Дата</span>
                                    <span className="asteroid__dots"></span>
                                    <span>{item.date}</span>
                                </div>
                                <div className="asteroid__info asteroid__distance">
                                    <span>Расстояние</span>
                                    <span className="asteroid__dots"></span>
                                    <span>{
                                        location.pathname === '/' ?
                                            activeDistance === 0 ? item.distanceKM + ' km' : item.distanceLUNAR + ' lunar' :
                                            item.distanceKM + ' km'
                                    }</span>
                                </div>
                                <div className="asteroid__info asteroid__size">
                                    <span>Размер</span>
                                    <span className="asteroid__dots"></span>
                                    <span>{item.size} м</span>
                                </div>
                            </div>
                            <div className="asteroid__btn-wrapper">
                                <p className="asteroid__rating">Оценка: <br />
                                    {
                                        item.dangerous === false ? <span>не опасен</span> : <span>опасен</span>
                                    }
                                </p>
                                {
                                    location.pathname !== '/cart' ? !isAdded ? <button className="asteroid__btn" onClick={(e) => onClickAddToCart(e, item)}>На уничтожение</button>
                                        : <button className="asteroid__btn" onClick={(e) => e.preventDefault()}>В корзине</button> : ''
                                }
                            </div>
                        </div>
                    </div>
                </div> : ''
            }
        </div>
    )
}

export default AsteroidMainItem
