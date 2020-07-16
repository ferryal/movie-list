import { combineReducers } from 'redux';
import { reducer as listMovie } from './reducer/listMovie';
import { reducer as detailMovie } from './reducer/detailMovie';
import { reducer as myMovie } from './reducer/myMovie';

export default combineReducers({
  listMovie,
  detailMovie,
  myMovie
});
