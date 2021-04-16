import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


import { Header, AsteroidCartItem } from '../components'
import { setAsteroid } from '../redux/actions/asteroidPage'
import { deleteAsteroid } from '../redux/actions/cart'


function Cart() {

    const dispatch = useDispatch();

    const setItemForPage = item => {
        dispatch(setAsteroid(item))
    }


    const items = useSelector(({ cart }) => cart.items)

    const deleteItemFromCart = (e, item) => {
        e.preventDefault();
        if (global.confirm("Удалить астероид?")) {
            dispatch(deleteAsteroid(items.filter(obj => obj.id !== item.id)))
        }
    }

    return (
        <div className='container'>
            <Header />
            {
                items.length > 0 ? items.map(item => <AsteroidCartItem
                    key={`${item.name} + ${item.size}`}
                    item={item}
                    setItemForPage={setItemForPage}
                    deleteItem={deleteItemFromCart} />)
                    : <h1 className='cart__title'>Ваша корзина пуста.</h1>
            }
            {
                items.length > 0 ? <div className="asteroid__btn-cartWrapper">
                    <button className="asteroid__btn" onClick={() => alert("Бригада выдвинулась!")}>Заказать бригаду</button>
                </div> : ''
            }
            <footer className="footer">
                <p className="footer__rights">2021 &copy; Все права и планета защищены</p>
            </footer>
        </div>
    )
}

export default Cart
