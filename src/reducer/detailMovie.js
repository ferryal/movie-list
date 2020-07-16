import { MOVIEDETAIL } from '../actions/ActionTypes';

const initialState = {
  loading: false,
  detail: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVIEDETAIL.LOADING:
      return {
        ...state,
        loading: true
      };
    case MOVIEDETAIL.FETCH_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.data
      };
    case MOVIEDETAIL.FETCH_DETAIL_FAILED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
