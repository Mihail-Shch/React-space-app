import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


import { AsteroidMainItem } from '../components'


function Cart() {

    const items = useSelector(({ cart }) => cart.items)

    return (
        <div className='container'>
            {
                items.length > 0 ? items.map(item => <Link to={`/asteroid/${item.id}`} key={`${item.name} + ${item.size}`}>
                    <AsteroidMainItem item={item} />
                </Link>)
                    : <h1 className='cart__title'>Ваша корзина пуста.</h1>
            }
            {
                items.length > 0 ? <div className="asteroid__btn-cartWrapper">
                    <button className="asteroid__btn" onClick={() => alert("Бригада выдвинулась!")}>Заказать бригаду</button>
                </div> : ''
            }
        </div>
    )
}

export default Cart
