import {
  RESET_QUESTIONS,
  NEXT_QUESTION,
  PREV_QUESTION,
  SET_ITEM_TYPE,
  GET_QUESTIONS,
} from '../actions/types.js';

const movie_questions = require('../questionData/movieQuestions.json');
const tv_questions = require('../questionData/tvQuestions.json');
const book_questions = require('../questionData/bookQuestions.json');
const questions = {
  movies: movie_questions,
  tv: tv_questions,
  books: book_questions,
};

const initialState = {
  item_type: '',
  questions: [],
  responses: [],
  question_number: 0,
  got_questions: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RESET_QUESTIONS:
      return {
        ...state,
        item_type: '',
        questions: [],
        responses: [],
        question_number: 0,
        got_questions: false
      };
    case SET_ITEM_TYPE:
      return {
        ...state,
        item_type: action.payload,
      };
    case GET_QUESTIONS:
      return {
        ...state,
        questions: questions[action.payload],
        got_questions: true,
      };
    case NEXT_QUESTION:
      return {
        ...state,
        responses:
          typeof action.payload == 'string'
            ? state.responses.filter((item) => item.db_key !== action.payload)
            : state.responses
                .filter((item) => item.db_key !== action.payload.db_key)
                .concat(action.payload),
        question_number: state.question_number + 1,
      };
    case PREV_QUESTION:
      if (state.question_number > 0) {
        return {
          ...state,
          responses:
            typeof action.payload == 'string'
              ? state.responses.filter((item) => item.db_key !== action.payload)
              : state.responses
                  .filter((item) => item.db_key !== action.payload.db_key)
                  .concat(action.payload),
          question_number: state.question_number - 1,
        };
      } else {
        return state;
      }

    default:
      return state;
  }
}
