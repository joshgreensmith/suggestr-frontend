import { RESET_QUESTIONS, GET_POOL_SIZE, GET_RECCS, REPLACE_WATCHED_ITEM } from '../actions/types';

const initialState = {
  pool_size: 0,
  reccs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RESET_QUESTIONS:
      return {
        ...state,
        pool_size: 0,
        reccs: [],
      }
    case GET_POOL_SIZE:
      return {
        ...state,
        pool_size: action.payload,
      };
    case GET_RECCS:
      return {
        ...state,
        reccs: action.payload,
      };
    case REPLACE_WATCHED_ITEM:
      let reccs = [...state.reccs];
      const i = reccs.length - 1;
      reccs.splice(action.payload, 1, reccs[i]);
      reccs.splice(-1, 1);
      return {
        ...state,
        reccs,
      }
    default:
      return state;
  }
}
