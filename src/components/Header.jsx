import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, Button } from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'  
import{faPowerOff} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"
import { loginContext } from '../context/Contextshare';
import {faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Badge from 'react-bootstrap/Badge';
import { useDispatch, useSelector } from 'react-redux';


function Header() {
  const [token, setToken] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loginStatus,setLoginStatus} = useContext(loginContext)
  const cartArray = useSelector((state)=>state.cartReducer)

  const logout = () =>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    setToken('')
    setLoginStatus(false)
    navigate('/')
    dispatch(emptyCart(cartArray))
  }

  console.log(cartArray);
  

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      setToken(sessionStorage.getItem('token'))
    }
  },[loginStatus,cartArray])

  return (
  <>

    <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
      <div className="container">
        <Navbar.Brand href="#">
        <Link to={'/'} className='text-decoration-none'><h4 className='text-light fw-bolder'><img src={logo} alt="no image" style={{height:"30px"}} className='me-2'/>BookSwap</h4></Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarResponsive" />
        <Navbar.Collapse id="navbarResponsive">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/books">Buy</Nav.Link>
            <Nav.Link href="/profile">Sell</Nav.Link>
            <Link to={'/cart'}><button className='btn btn-outline-light ml-lg-3 mx-2' > <FontAwesomeIcon icon={faCartShopping} className='me-1' /> cart <Badge bg="secondary" className='ms-1'>{cartArray?.length}</Badge></button></Link>
            {!token?
              <Link to={'/login'}><Button variant="light" className="ml-lg-3 ms-2">Get Started</Button></Link>
              :
              <Link to={'/'}><Button onClick={logout} variant="danger" className="ml-lg-3 ms-2" > Logout<FontAwesomeIcon icon={faPowerOff} className='ms-2' /></Button></Link>
            }
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  </>
  )
}

export default Header