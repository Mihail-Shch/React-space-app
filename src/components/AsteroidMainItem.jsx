import React from 'react'
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

import dino from '../img/dino.svg';
import asteroidImg from '../img/asteroid.svg';

function AsteroidMainItem({ item, setItemForPage, activeDistance, onClickAddToCart }) {

    const [isAdded, setIsAdded] = React.useState(false)
    const [isLoaded, setIsLoaded] = React.useState(false)


    const addToCart = (e, item) => {
        onClickAddToCart(e, item);
        setIsAdded(true)
    }


    const items = useSelector(({ cart }) => cart.items)

    React.useEffect(() => {
        if (items.length > 0) {
            items.find(obj => obj.id === item.id) ? setIsAdded(true) : setIsAdded(false)
        }
        setIsLoaded(true)
    }, [])



    return (
        <div>
            {
                isLoaded ? <Link to={`/asteroid/${item.id}`} onClick={() => setItemForPage(item)}>
                    <div className="asteroid__wrapper">
                        <div className={classNames('content__asteroids-item', 'asteroid', {
                        'green': item.dangerous !== true,
                        'red': item.dangerous === true,
                        'small': item.size < 200,
                        'medium': item.size > 200 && item.size < 500,
                        'large': item.size > 500
                    })}>
                        <img src={dino} className="asteroid__dino" alt="dino" width="56" height="48" />
                        <img src={asteroidImg} className="asteroid__photo" alt="asteroid" />
                        <div className="desc__wrapper">
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
                                        activeDistance === 0 ? item.distanceKM + ' km' : item.distanceLUNAR + ' lunar'
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
                                     !isAdded ? <button className="asteroid__btn" onClick={(e) => addToCart(e, item)}>На уничтожение</button>
                                     : <button className="asteroid__btn" onClick={(e) => e.preventDefault()}>В корзине</button>
                                }
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </Link> : ''
            }
        </div>
    )
}

export default AsteroidMainItem
