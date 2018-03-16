import { combineReducers } from 'redux';
import auth from './auth_reducer';
import restaurants from './restaurants_reducer';
import favorites from './favorite_reducer';

export default combineReducers({
  auth, favorites, restaurants
});
