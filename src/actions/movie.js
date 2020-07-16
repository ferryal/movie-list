import axios from 'axios';
import config from '../config';
import { LISTMOVIE, MOVIEDETAIL, MYMOVIE } from './ActionTypes';


function loading() {
  return {
    type: LISTMOVIE.LOADING
  };
}

function fetchSuccess(data) {
  return {
    type: LISTMOVIE.FETCH_SUCCESS,
    payload: { data }
  };
}

function fetchFailed() {
  return {
    type: LISTMOVIE.FETCH_FAILED
  };
}

function fetchSuccessDetail(data) {
  return {
    type: MOVIEDETAIL.FETCH_DETAIL_SUCCESS,
    payload: {data}
  };
}

function fetchFailedDetail() {
  return {
    type: MOVIEDETAIL.FETCH_DETAIL_FAILED
  }
}

function fetchSuccessMyMovie(data) {
  return {
    type: MYMOVIE.FETCH_SUCCESS,
    payload: data
  }
}

function fetchAddMovie(data) {
  return {
    type: MOVIEDETAIL.FETCH_ADD_MOVIE,
    payload: data
  }
}

function removeMovie(id) {
  return {
    type: MYMOVIE.REMOVE_MOVIE,
    payload: id
  }
}

export function fetchListMovie(title) {
  return (dispatch) => {
    dispatch(loading());
    axios.get(`${config.apiUrl}/?s=${title}&apikey=${config.apiKey}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.status === 200) {
        const response = res.data;
        dispatch(fetchSuccess(response));
      } else {
        dispatch(fetchFailed());
      }
    }).catch(() => {
      dispatch(fetchFailed());
    });
  };
}

export function fetchMovieDetail(id) {
  return (dispatch) => {
    axios.get(`${config.apiUrl}/?i=${id}&apikey=${config.apiKey}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status === 200) {
        const response = res.data;
        dispatch(fetchSuccessDetail(response));
      } else {
        dispatch(fetchFailedDetail());
      }
    }).catch(() => {
      dispatch(fetchFailedDetail());
    })
  }
}


export function addMovie(payload) {
  return (dispatch) => {
    if ( payload !== '') {
      dispatch(fetchAddMovie(payload))
      dispatch(fetchSuccessMyMovie(payload))
    } else {
      dispatch(fetchFailed())
    }
  }
}


export function deleteMovie(payload) {
  return (dispatch) => {
    if (payload !== '') {
      dispatch(removeMovie(payload))
    } else {
      dispatch(fetchFailed())
    }
  }
}