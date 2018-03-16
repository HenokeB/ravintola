
import qs from 'qs';
import restaurants from '../api/restaurants.json';
import rest from '../api/restaurants.json';
//import geolib from 'geolib';
import {
  FETCH_RESTAURANTS,
  LIKE_RESTAURANT,
  CLEAR_FAVORITE_RESTAURANTS,
} from './types';



/* export const allRestaurant = () => {
  return {
    payload: restaurants,
    type: FETCH_RESTAURANTS
  }
} 
filterByRadius = (el) => {
  return geolib.isPointInCircle( this.state.location.coords, el.location, this.state.radius)
};*/

export const likeRestaurant = (restaurant) => {
  return {
    payload: restaurant,
    type: LIKE_RESTAURANT
  };
};

export const clearLikedRestaurants = () => {
  return { type: CLEAR_FAVORITE_RESTAURANTS };
};

export const fetchNearbyRestaurants = (restaurants, callback) => async (dispatch) => {
  try {
    let  data  = restaurants;
    dispatch({ type: FETCH_RESTAURANTS, payload: data });
    callback();
  } catch(e) {
    console.error(e);
  }
};