import React from 'react'
import classNames from 'classnames';
import { Link } from 'react-router-dom'


import dino from '../img/dino.svg';
import asteroidImg from '../img/asteroid.svg';

function AsteroidCartItem({ item, setItemForPage, deleteItem }) {
    return (
        <Link to={`./asteroid/${item.id}`} onClick={() => setItemForPage(item)}>
            <div className={classNames('content__asteroids-item', 'asteroid', 'cart', {
                'green': item.dangerous !== true,
                'red': item.dangerous === true,
                'small': item.size < 200,
                'medium': item.size > 200 && item.size < 500,
                'large': item.size > 500
            })}>
                <div className="asteroid__close" onClick={(e) => deleteItem(e, item)}>X</div>
                <img src={dino} className="asteroid__dino" alt="dino" width="56" height="48" />
                <img src={asteroidImg} className="asteroid__photo" alt="asteroid" />
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
                            <span>{item.distanceKM} km</span>
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
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default AsteroidCartItem
