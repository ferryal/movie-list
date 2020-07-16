import { LISTMOVIE } from '../actions/ActionTypes';

const initialState = {
  loading: false,
	listMovie: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTMOVIE.LOADING:
      return {
        ...state,
        loading: true
      };
    case LISTMOVIE.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
				listMovie: action.payload.data
      };
    case LISTMOVIE.FETCH_FAILED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
