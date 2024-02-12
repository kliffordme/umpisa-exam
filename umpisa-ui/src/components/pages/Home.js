import React, { useEffect, useState } from 'react';
import './Home.css'
import { ReactComponent as Books } from '../../assets/icons/book.svg';
import { ReactComponent as Users } from '../../assets/icons/users.svg';
import { ReactComponent as Authors } from '../../assets/icons/author.svg';
import { ReactComponent as Downloads } from '../../assets/icons/download.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks, setBooksData } from '../../redux/actions/action';
import axios from 'axios'
import { selectBooks } from '../../redux/selectors/selectors';

export const Home = () => {
  const dispatch = useDispatch()
  const books = useSelector(selectBooks)

  const [data, setData] = useState([])

  useEffect(()=>{
    dispatch(getAllBooks())
  },[])

  useEffect(()=>{
    setData(books)
  }, [books])

  const currentPost = data.slice(0, 4)


  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="analytics-cards shadow bg-white rounded">
            <div className='d-flex justify-content-between'>
              <div className='mt-2 fw-bold text-info'>
                <span className='title'>
                  Total Books: 
                </span>
                <br/>
                {books.length}
              </div>
              <Books style={{ width: '50px', height: '50px' }} />
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="analytics-cards shadow bg-white rounded">
            <div className='d-flex justify-content-between'>
              <div className='mt-2 fw-bold text-info'>
                <span className='title'>
                  Total Users: 
                </span>
                <br/>
                23
              </div>
              <Users style={{ width: '50px', height: '50px' }} />
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="analytics-cards shadow bg-white rounded">
            <div className='d-flex justify-content-between'>
              <div className='mt-2 fw-bold text-info'>
                <span className='title'>
                  Authors: 
                </span>
                <br/>
                36
              </div>
              <Authors style={{ width: '50px', height: '50px' }} />
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="analytics-cards shadow bg-white rounded">
            <div className='d-flex justify-content-between'>
              <div className='mt-2 fw-bold text-info'>
                <span className='title'>
                  Downloads: 
                </span>
                <br/>
                377
              </div>
              <Downloads style={{ width: '50px', height: '50px' }} />
            </div>
          </div>
        </div>
      </div>
      <div className='large-card shadow bg-white rounded'>
        <span className='title fw-bold text-info'>
          Featured Books
        </span>
        <div className='d-flex'>
        {currentPost.map((book)=> (
          <div className='m-3'>
            <div className='featured-container shadow bg-white rounded'>
              <div className='p-3'>
                  <div className='d-flex'>
                    <img src={`http://localhost:3000/${book.image}`} style={{width: '35%', height:'60%', marginRight: '10px'}} alt={book.title} />
                    <div>
                      <div className='featured-card'> {book.title}</div>
                      <div className='featured-card'>Rating: {book.rating}</div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        ))}
        </div>
        <span className='title fw-bold text-info'>
          New Books
        </span>
        <div className='d-flex'>
        {currentPost.map((book)=> (
          <div className='m-3'>
            <div className='featured-container shadow bg-white rounded'>
              <div className='p-3'>
                  <div className='d-flex'>
                    <img src={`http://localhost:3000/${book.image}`} style={{width: '35%', height:'60%', marginRight: '10px'}} alt={book.title} />
                    <div>
                      <div className='featured-card'> {book.title}</div>
                      <div className='featured-card'>Rating: {book.rating}</div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};
