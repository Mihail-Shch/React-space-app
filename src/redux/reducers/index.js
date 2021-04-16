import { combineReducers } from 'redux';

import asteroids from './asteroids';
import cart from './cart';
import asteroidPage from './asteroidPage'


const rootReducer = combineReducers({
    asteroids,
    cart,
    asteroidPage
})

export default rootReducer;