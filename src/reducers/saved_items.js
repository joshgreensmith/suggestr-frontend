import { GET_SAVED_ITEMS, ADD_SAVED_ITEM, DELETE_SAVED_ITEM } from '../actions/types';

const initialState = {
  saved_items: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SAVED_ITEMS:
      return {
        ...state,
        saved_items: action.payload,
      };
    case ADD_SAVED_ITEM:
      return {
        ...state,
        saved_items: [...state.saved_items, action.payload]
      }
    case DELETE_SAVED_ITEM:
      return {
        ...state,
        saved_items: state.saved_items.filter(item => item.id !== action.payload)
      }
    default:
      return state;
  }
}
