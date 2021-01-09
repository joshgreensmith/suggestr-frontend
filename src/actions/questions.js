import { NEXT_QUESTION, PREV_QUESTION } from './types';

export const nextPrevQuestion = (name, response) => (dispatch) => {
  // Check if response to be passed to reducer or to remove response from list in reducer instead
  if (
    (response.multi_response &&
      response.multi_response_arr.length > 0 &&
      !response.multi_response_arr.includes("Don't mind")) ||
    (response.single_response &&
      response.single_response_str !== "Don't mind" &&
      response.single_response_str !== '') ||
    (response.range &&
      response.single_response_str !== "Don't mind" &&
      response.single_response_str !== '')
  ) {
    if (name == 'Next') {
      dispatch({
        type: NEXT_QUESTION,
        payload: response,
      });
    } else if (e.target.name == 'Previous') {
      dispatch({
        type: PREV_QUESTION,
        payload: response,
      });
    }
  } else {
    if (name == 'Next') {
      dispatch({
        type: NEXT_QUESTION,
        payload: response.db_key,
      });
    } else if (name == 'Previous') {
      dispatch({
        type: PREV_QUESTION,
        payload: response.db_key,
      });
    }
  }
}