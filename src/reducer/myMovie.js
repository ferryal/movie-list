import { MYMOVIE } from '../actions/ActionTypes';

const initialState = {
	myMovie: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MYMOVIE.FETCH_SUCCESS:
      return {
        ...state,
        MYMOVIE: [...state.myMovie, action.payload]
      };
		case MYMOVIE.REMOVE_MOVIE:
			return {
				...state,
				myMovie: [...state.myMovie.filter((item, index) => index !== action.payload)]
			};
     default:
      return state;
  }
};