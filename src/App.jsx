
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import PageNotFound from './pages/PageNotFound'
import Footer from './components/Footer'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Books from './pages/Books'
import Profile from './pages/Profile'
import Landingpage from './pages/Landingpage'
import AddBooks from './pages/AddBooks'
import EditBooks from './pages/EditBooks'
import BookDetails from './pages/BookDetails'
import Cart from './pages/Cart'

function App() {
  

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Landingpage/>}/>  
        <Route path='/books' element={<Books/>}/>  
        <Route path='/register' element={<Auth register/> }/> 
        <Route path='/login' element={<Auth/>}/> 
        <Route path='/add' element={<AddBooks/>}/>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/edit/:id' element={<EditBooks/>}/>
        <Route path='/book-details/:id' element={<BookDetails/>}/>
        <Route path='*' element={<PageNotFound/>}/> 
        <Route path='/profile' element={<Profile/>}/>  
      </Routes>
      <Footer/>
    </>
  )
}

export default App
