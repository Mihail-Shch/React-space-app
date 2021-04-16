import React from 'react'
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import dino from '../img/dino.svg';
import asteroidImg from '../img/asteroid.svg';

import { addToCart } from '../redux/actions/cart';

function AsteroidPageItem({ asteroid }) {

    const items = useSelector(({ cart }) => cart.items)

    const [isAdded, setIsAdded] = React.useState(false)

    React.useEffect(() => {
        if (items.length > 0) {
            items.find(obj => obj.id === asteroid.id) ? setIsAdded(true) : setIsAdded(false)
        }
    }, [])

    const dispatch = useDispatch();

    const onClickAddToCart = (e, asteroid) => {
        e.preventDefault();
        dispatch(addToCart(asteroid))
        setIsAdded(true)
    }

    return (
        <div className={classNames('content__asteroids-item', 'asteroid', {
            'green': asteroid.dangerous !== true,
            'red': asteroid.dangerous === true,
            'small': asteroid.size < 200,
            'medium': asteroid.size > 200 && asteroid.size < 500,
            'large': asteroid.size > 500
        })}>
            <img src={dino} className="asteroid__dino" alt="dino" width="56" height="48" />
            <img src={asteroidImg} className="asteroid__photo" alt="asteroid" />
            <div className="asteroid__desc-wrapper">
                <div className="asteroid__desc">
                    <span className="asteroid__title">{asteroid.name}</span>
                    <div className="asteroid__info asteroid__date">
                        <span>Дата</span>
                        <span className="asteroid__dots"></span>
                        <span>{asteroid.date}</span>
                    </div>
                    <div className="asteroid__info asteroid__distance">
                        <span>Расстояние</span>
                        <span className="asteroid__dots"></span>
                        <span>{asteroid.distanceKM} km</span>
                    </div>
                    <div className="asteroid__info asteroid__size">
                        <span>Размер</span>
                        <span className="asteroid__dots"></span>
                        <span>{asteroid.size} м</span>
                    </div>
                </div>
                <div className="asteroid__btn-wrapper">
                    <p className="asteroid__rating">Оценка: <br />
                        {
                            asteroid.dangerous === false ? <span>не опасен</span> : <span>опасен</span>
                        }
                    </p>
                    {
                        !isAdded ? <button className="asteroid__btn" onClick={(e) => onClickAddToCart(e, asteroid)}>На уничтожение</button>
                            : <button className="asteroid__btn" onClick={(e) => e.preventDefault()}>В корзине</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AsteroidPageItem
