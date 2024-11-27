import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginApi, registerApi } from '../services/allApi'
import { loginContext } from '../context/Contextshare'

// import { loginContext } from '../context/Contextshare'

function Auth({ register }) {
  const navigate = useNavigate()
  const {setLoginStatus} = useContext(loginContext)
  // const {setLoginStatus} = useContext(loginContext)
  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleRegister = async (e) => {
    e.preventDefault()
    const {username,email,password}=registerUser
    if(!username || !email || !password){
      toast.warning('please fill the form completely')
    }
    else{
      const result = await registerApi(registerUser)
      console.log(result);
      if(result.status==200){
        toast.success('Registered Successfully')
        setRegisterUser({
          username:"",
          email:"",
          password:""
        })
        navigate('/login')
      }
      else{
        toast.error(result.response.data)
        setRegisterUser({
          username:"",
          email:"",
          password:""
        })
      }
    }

  }

  const handleLogin = async (e) => {
      e.preventDefault()
      const {email,password}=registerUser

      if(!email || !password){
        toast.info('Please fill the form completely')
      }
      else{
        const result = await loginApi({email,password})
        console.log(result);
        if(result.status==200){
          toast.success('Login Successful')
          setRegisterUser({
            username:"",
            email:"",
            password:""
          })
          sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token",result.data.token )
          setLoginStatus(true)
          navigate('/')
        }
        else{
          toast.error('Something went wrong')
          setRegisterUser({
            username:"",
            email:"",
            password:""
          })
        }
      }
  }


  return (
    <>

      <div className='container-fluid auth' >
        <div className="row p-5 bg-dark bg-opacity-50 " style={{ paddingTop: '100px', height: "100vh" }}>
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <div className="row my-5">
              <div className="col-md-4"></div>
              <div className="col-md-4 shadow py-5 rounded">
                <form className='w-100 d-flex justify-content-center align-items-center flex-column'>
                  <h2 className='text-light fw-bold'><img src={logo} alt="no image" style={{ height: "30px" }} className='me-2' />BookSwap</h2>
                  {register ?
                    <h6 className='mb-4 text-light'>sign up to your account</h6> :
                    <h6 className='mb-4 text-light'>sign in to your account</h6>
                  }

                  {register &&
                    <div className='mb-3 mt-3 w-75'>
                      <input type="text" className='form-control w-100' placeholder=' Username' value={registerUser.username} onChange={(e) => { setRegisterUser({ ...registerUser, username: e.target.value }) }} />
                    </div>
                  }

                  <div className='mb-3 w-75'>
                    <input type="email" className='form-control bg-outline-light' placeholder=' Email' value={registerUser.email} onChange={(e) => { setRegisterUser({ ...registerUser, email: e.target.value }) }} />
                  </div>

                  <div className='mb-3 w-75'>
                    <input type="password" className='form-control' placeholder=' Password' value={registerUser.password} onChange={(e) => { setRegisterUser({ ...registerUser, password: e.target.value }) }} />
                  </div>

                  <div className='mb-3 w-75'>
                    {register ?
                      <div>
                        <button className='btn btn-primary w-100' type='button' onClick={handleRegister}>Register</button>
                        <p className='mt-3 text-light text-center'>Already a User? Click here to<Link to={'/login'} className='text-danger text-decoration-none'> Login</Link></p>
                      </div>
                      :
                      <div>
                        <button className='btn btn-primary w-100' type='button' onClick={handleLogin}>Login</button>
                        <p className='mt-3 text-light text-center'>New User? Click here to <Link to={'/register'} className='text-danger text-decoration-none'>Register</Link></p>
                      </div>
                    }

                  </div>
                </form>

              </div>
              <div className="col-md-4"></div>
            </div>
            <Link to={'/'} className='text-decoration-none text-light text-center'><div><FontAwesomeIcon icon={faHouse} /><h5 className='fw-bold'>Home</h5></div></Link>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
      <ToastContainer autoClose={2000} theme="coloured" position='top-center' />
    </>
  )
}

export default Auth