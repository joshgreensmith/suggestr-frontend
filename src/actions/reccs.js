import axios from 'axios';
import { GET_POOL_SIZE, GET_RECCS } from './types';

const pool_size_urls = {
  'movies': '/api/movies/poolSize/',
  'tv': '/api/tv/poolSize/',
  'books': '/api/books/poolSize/'
}

const reccs_urls = {
  'movies': '/api/movies/reccomendations/',
  'tv': '/api/tv/reccomendations/',
  'books': '/api/books/reccomendations/'
}

export const getPoolSize = (item_type, responses) => (dispatch) => {
  axios.post(pool_size_urls[item_type], responses)
  .then((res) => {
    dispatch({
      type: GET_POOL_SIZE,
      payload: res.data,
    });
  });
};

export const getReccs = (item_type, responses) => (dispatch) => {
  axios.post(reccs_urls[item_type], responses)
  .then((res) => {
    dispatch({
      type: GET_RECCS,
      payload: res.data,
    })
  })
}
