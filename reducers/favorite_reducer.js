import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';
import {
  LIKE_RESTAURANT,
  CLEAR_FAVORITE_RESTAURANTS
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.favorites || [];
    case CLEAR_FAVORITE_RESTAURANTS:
      return [];
    case LIKE_RESTAURANT:
      return _.uniqBy([
        action.payload, ...state
      ], 'id');
    default:
      return state;
  }
}
