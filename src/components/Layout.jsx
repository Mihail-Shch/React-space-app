import React from 'react'
import { Header } from '../components'

function Layout(props) {
    return (
        <div className='container'>
            <Header />
            {props.children}
            <footer className="footer">
                <div className="container">
                    <p className="footer__rights">2021 &copy; Все права и планета защищены</p>
                </div>
            </footer>
        </div>
    )
}

export default Layout
