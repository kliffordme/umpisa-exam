// reducers.js

import { SET_BOOKS_DATA, SET_USERS_DATA } from '../actions/actionTypes';

const initialState = {
  books: [],
  usersCount: 0
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS_DATA:
      return {
        ...state,
        books: action.payload,
      };
    case SET_USERS_DATA:
      return {
        ...state,
        usersCount: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
