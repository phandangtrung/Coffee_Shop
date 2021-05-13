import {combineReducers} from 'redux';
import cartReducer from './components/productTag/reducers/index';

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
