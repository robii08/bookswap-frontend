import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{ faInstagram,faTwitter,faFacebook,faLinkedin,faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import logo from "../assets/logo.png"


function Footer() {
  return (
    <>
    <div className='container-fluid bg-dark p-5'>
        <div className="row">
            <div className="col-md-4 px-md-5">
                <h4 className='text-light fw-bold'><img src={logo} alt="no image" style={{height:"30px"}} className='me-2'/>BookSwap</h4>
                <p className='text-light mt-3' style={{textAlign:'justify'}}>Books should go where they will be most appreciated, and not sit unread, gathering dust on a forgotten shelf, don't you agree?</p>
            </div>
            <div className="col-md-2 px-md-5">
            <h4 className='text-light fw-medium'>Link</h4>
            <div className='text-light mt-3 '>
              <Link to={'/dashboard'} className='text-light text-decoration-none'><p>Home</p></Link>
              <Link to={'/books'} className='text-light text-decoration-none '><p>Books</p></Link>
              <Link to={'/profile'} className='text-light text-decoration-none'><p>Profile</p></Link>
            </div>
            </div>
            <div className="col-md-2 px-md-5">
            <h4 className='text-light fw-medium'>Guides</h4>
            <div className='text-light mt-3 '>
              <p>React</p>
              <p>React Bootstrap</p>
              <p>Bootswatch</p>
              <p></p>
            </div>
            </div>
            <div className="col-md-4 px-md-5">
              <h4 className='text-light fw-medium'>Contact Us</h4>
              <div className='d-flex mt-4'>
                <input type="text" placeholder='Email Id' className='form-control  bg-light me-3'/>
                <button className='btn btn-dark '>Subscribe</button>
              </div>
              

            </div>
        </div>

        <div className='border-top mt-4 d-flex align-items-center justify-content-center flex-column pt-5'>
          
          <div className='d-flex  align-items-center'>
                <FontAwesomeIcon icon={faInstagram} className='fa-2x px-3 text-light' />
                <FontAwesomeIcon icon={faTwitter} className='fa-2x px-3 text-light' />
                <FontAwesomeIcon icon={faFacebook} className='fa-2x px-3 text-light' />
                <FontAwesomeIcon icon={faLinkedin} className='fa-2x px-3 text-light' />
                <FontAwesomeIcon icon={faWhatsapp} className='fa-2x px-3 text-light' />
          </div>
          <p className='text-light fw-medium mt-4' style={{fontSize:"12px"}}>© 2024 BookSwap. All Rights Reserved.</p>
        </div>
    </div>
    </>
  )
}

export default Footer