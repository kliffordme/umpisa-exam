import React from 'react';
import './Home.css'
import { ReactComponent as Logo } from '../../assets/icons/book.svg';


export const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="analytics-cards shadow bg-white rounded">
            <div className='d-flex justify-content-between'>
              <div className='mt-2'>
                Total Books: 
                <br/>
                210
              </div>
              <Logo style={{ width: '50px', height: '50px' }} />
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="analytics-cards shadow bg-white rounded">
            <div className='d-flex justify-content-between'>
              <div className='mt-2'>
                Total Books: 
                <br/>
                210
              </div>
              <Logo style={{ width: '50px', height: '50px' }} />
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="analytics-cards shadow bg-white rounded">
            <div className='d-flex justify-content-between'>
              <div className='mt-2'>
                Total Books: 
                <br/>
                210
              </div>
              <Logo style={{ width: '50px', height: '50px' }} />
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div className="analytics-cards shadow bg-white rounded">
            <div className='d-flex justify-content-between'>
              <div className='mt-2'>
                Total Books: 
                <br/>
                210
              </div>
              <Logo style={{ width: '50px', height: '50px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
