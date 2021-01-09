import axios from 'axios';
import { GET_SAVED_ITEMS, ADD_SAVED_ITEM, DELETE_SAVED_ITEM } from './types';
import { tokenConfig } from './auth';

export const getSavedItems = (item_type) => (dispatch, getState) => {
  axios.get('/api/saved_items/', tokenConfig(getState))
  .then((res) => {
    dispatch({
      type: GET_SAVED_ITEMS,
      payload: res.data,
    });
  });
};

export const addSavedItem = (item) => (dispatch, getState) => {
  axios.post('/api/saved_items/', item, tokenConfig(getState))
  .then((res) => {
    dispatch({
      type: ADD_SAVED_ITEM,
      payload: res.data
    })
  });
};

export const deleteSavedItem = (id) => (dispatch, getState) => {
  axios.delete(`/api/saved_items/${id}/`, tokenConfig(getState)).then((res) => {
    dispatch({
      type: DELETE_SAVED_ITEM,
      payload: id
    })
  })
}
