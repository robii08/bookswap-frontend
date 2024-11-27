import React from 'react'
import { Col, Row } from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{faCircleRight} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


function Home() {
  return (
    <>
     <div className="container-fluid w-100 bg" style={{height:"100vh"}}>
        <Row className='pt-5'>
          <Col md={6} className='d-flex justify-content-center align-items-center flex-column p-5'>
            <div className='ps-md-0 ps-4 p-5 mt-5'>
              <h1 style={{fontSize:"70px"}} className='fw-bold'>BookSwap</h1>
              <h6 className='text-light'>“Books should go where they will be most appreciated, and not sit unread, gathering dust on a forgotten shelf, don't you agree?”</h6>
         
              <Link to={'/login'}><button className='btn btn-outline-light mt-4 me-2 px-4'>Get Started <FontAwesomeIcon icon={faCircleRight} className='ms-2' /></button></Link>
              
            </div>
          </Col>
          <Col md={6} className='d-flex justify-content-center align-items-center p-5'>
           
          </Col>
        </Row> 
      </div>
    </>
  )
}

export default Home