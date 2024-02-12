// reducers.js

import { SET_BOOKS_DATA } from '../actions/actionTypes';

const initialState = {
  books: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS_DATA:
      return {
        ...state,
        books: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
