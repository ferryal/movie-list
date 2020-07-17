import { MYMOVIE } from '../actions/ActionTypes';

const initialState = {
	myMovie: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MYMOVIE.FETCH_SUCCESS:
      localStorage.setItem('myMovie', [...state.myMovie, action.payload]);
      return {
        ...state,
        myMovie: [...state.myMovie, action.payload]
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