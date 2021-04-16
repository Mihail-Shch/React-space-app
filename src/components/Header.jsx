import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

const Header = React.memo(function Header() {

    const location = useLocation();
    const items = useSelector(({ cart }) => cart.items)

    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <h2 className="header__title">Armageddon v</h2>
                    <div className="header__pages">
                        <Link to={'/'}><button className={classNames("header__btn", {
                            'active': location.pathname === '/'
                        })}>Астероиды</button></Link>
                        <Link to={'/cart'}><button className={classNames("header__btn", "header__btn-second", {
                            'active': location.pathname === '/cart'
                        })}>Уничтожение</button></Link>
                        { items.length > 0 && <i className="header__totalcount">{items.length}</i>}
                    </div>
                    <p className="header__subtitle">Сервис мониторинга и уничтожения астероидов, опасно подлетающих к Земле.</p>
                </div>
                <div className="header__line"></div>
            </div>
        </header>
    )
})

export default Header
