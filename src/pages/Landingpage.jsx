import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import fiction from '../assets/fiction.jpg';
import fantasy from '../assets/fantasy.webp';
import edu from '../assets/edu.avif';
import roma from '../assets/roma.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { homeBooksApi } from '../services/allApi';
import { serverurl } from '../services/serverUrl';
import { searchContext } from '../context/Contextshare';


function Landingpage() {
  const [token,setToken]=useState('')
  const {setSearchKey} = useContext(searchContext)
  const [homeBooks, setHomeBooks] = useState([])
  const navigate = useNavigate()

  const getHomeBooks = async()=>{
    const result = await homeBooksApi()
    setHomeBooks(result.data)
  }
  console.log(homeBooks);
  
  const search=(key)=>{
    setSearchKey(key)
    navigate("/books")
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    getHomeBooks()
  },[])

  return (
    <>
    
    <section className="hero d-flex align-items-center justify-content-center text-center text-light bg-dark">
      <Container>
        <h1 className="display-3 fw-bold">Buy & Sell Books Easily</h1>
        <p className="lead mb-4">Discover, Buy, and Sell Your Favorite Books in One Place</p>
        <Link to={'/books'}><Button variant="light" size="lg">Browse Books</Button></Link>
      </Container>
    </section>

    <section className="featured py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4">Featured Books</h2>
        <Row>
          {homeBooks.map((item)=>
            <Col md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={`${serverurl}/uploads/${item?.bookImg}`} alt="Book 1" height={"400px"} />
              <Card.Body>
                <Card.Title className='text-center'>{item.title}</Card.Title>
                <Card.Text className='text-center'>{item.authors}</Card.Text>
              </Card.Body>
            </Card>
          </Col>)
          }
        </Row>
        {token?
          <Link to={'/books'} className='text-decoration-none '><h3 className='text-center text-success'>Explore More</h3></Link>
          :
          <h3 className='text-center text-success'><Link to={'/login'} className='text-danger'>Login</Link> to Explore More</h3>
        }
      </Container>
    </section>

    <section className="categories py-5">
      <Container>
        <h2 className="text-center mb-4">Browse by Categories</h2>
        <Row>
          <Col md={3}>
            <Card className="text-center p-4 mb-4 position-relative d-flex justify-content-center align-items-center">
              <img src={fiction} onClick={()=>search("fiction")} alt="z-0 position-absolute" width={"100%"} height={"200px"} className=''/>
              <Card.Title className='z-1 position-absolute text-light fs-2 '>Fiction</Card.Title>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center p-4 mb-4 position-relative d-flex justify-content-center align-items-center">
              <img src={fantasy} onClick={()=>search("fantasy")} alt="z-0 position-absolute" width={"100%"} height={"200px"} className=''/>
              <Card.Title className='z-1 position-absolute text-light fs-2 '>Fantasy</Card.Title>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center p-4 mb-4 position-relative d-flex justify-content-center align-items-center">
              <img src={edu} onClick={()=>search("educational")} alt="z-0 position-absolute" width={"100%"} height={"200px"} className=''/>
              <Card.Title className='z-1 position-absolute text-light fs-2 '>Educational</Card.Title>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center p-4 mb-4 position-relative d-flex justify-content-center align-items-center">
              <img src={roma} onClick={()=>search("romance")} alt="z-0 position-absolute" width={"100%"} height={"200px"} className=''/>
              <Card.Title className='z-1 position-absolute text-light fs-2 '>Romance</Card.Title>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>

    <section className="testimonials py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4">What Our Users Say</h2>
        <Row>
          <Col md={6} className="mb-4">
            <blockquote className="blockquote text-center">
              <p className="mb-0">"BookSwap is the best platform to buy and sell books online. I found amazing deals and sold my old textbooks easily!"</p>
              <footer className="blockquote-footer mt-2">John Doe</footer>
            </blockquote>
          </Col>
          <Col md={6}>
            <blockquote className="blockquote text-center">
              <p className="mb-0">"A fantastic experience! I love the variety of books available."</p>
              <footer className="blockquote-footer mt-2">Jane Smith</footer>
            </blockquote>
          </Col>
        </Row>
      </Container>
    </section>


    </>
  )
}

export default Landingpage