// actions.js

import axios from 'axios';
import { 
    SET_BOOKS_DATA,
    SET_USERS_DATA
 } from './actionTypes';

export const setBooksData = (booksData) => ({
  type: SET_BOOKS_DATA,
  payload: booksData,
});

export const setUsersData = (usersData) => ({
    type: SET_USERS_DATA,
    payload: usersData,
  });

export const getAllBooks = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_ROUTE}api/books/all`);
    dispatch(setBooksData(data.books));
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_API_ROUTE}api/user/count`);
    dispatch(setUsersData(data.count));
  } catch (error) {
    console.error(error);
  }
};
