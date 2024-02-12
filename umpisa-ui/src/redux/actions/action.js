// actions.js

import axios from 'axios';
import { SET_BOOKS_DATA } from './actionTypes';

export const setBooksData = (booksData) => ({
  type: SET_BOOKS_DATA,
  payload: booksData,
});

export const getAllBooks = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/books/all');
    dispatch(setBooksData(data.books));
  } catch (error) {
    console.error(error);
  }
};
