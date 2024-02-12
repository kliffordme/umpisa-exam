import React, { useEffect, useState } from 'react';
import './Authors.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectBooks } from '../../redux/selectors/selectors';
import { getAllBooks } from '../../redux/actions/action';

export const Authors = () => {
  // Sample authors data (replace with your actual data)
  const authors = useSelector(selectBooks)
  const [data, setData] = useState([])
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllBooks())
  }, [])

  useEffect(()=>{
    setData(authors)
  }, [authors])

  return (
    <div className='shadow bg-white rounded author-container p-4'>
      <h2 className='fw-bold mb-4'>Authors</h2>
      <ul className="list-group">
        {authors.map(book => (
          <li key={book._id} className="list-group-item d-flex justify-content-between align-items-center">
            {book.author}
            {/* Add additional elements or actions here */}
          </li>
        ))}
      </ul>
    </div>
  );
};
