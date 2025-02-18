import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import { removeCart } from '../redux/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { serverurl } from '../services/serverUrl';
import lock from "../assets/lock.webp";

function Cart() {
  const [token, setToken] = useState("")
  const cartArray = useSelector((state)=>state.cartReducer)
  console.log(cartArray);
  const dispatch = useDispatch()
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()
  const getTotal = () =>
  {
    if(cartArray?.length>0)
    {setTotal(cartArray?.map((p)=>Math.floor(p.price)).reduce((p1,p2)=>p1+p2))}
    else
    {setTotal(0)} 
  }
  console.log(total);
  
  const handleCheckout=()=>
  {
    
    sessionStorage.setItem("total",total )
    navigate('/checkout')
  }
  useEffect(()=>{
      getTotal()
  },[cartArray])

   useEffect(()=>{
          if(sessionStorage.getItem("token")){
            setToken(sessionStorage.getItem("token"))
          }  
      },[])
  return (
    <>
    
      {
        token?
        <div className='container-fluid' style={{marginTop:'100px'}}>
        <h1 className='text-center'>Cart</h1>
        <div className="row">
          <div className="col-md-1"></div>
          {cartArray?.length>0 ?
          
          <div className="col-md-10">
            <div className="row mb-5">
              <div className="col-md-8 p-4">
                <table className='table table-bordered mt-5 shadow'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Image</th>
                      <th>Price</th>
                      <th className='text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartArray?.map((item)=>
                    <tr>
                      <td>{item?.id}</td>
                      <td>{item?.title}</td>
                      <td><img src={`${serverurl}/uploads/${item?.bookImg}`} alt="" style={{height:"180px", width:"180px"}} className='p-3' /></td>
                      <td>{item?.price}</td>
                      <td><Button variant="light" onClick={()=>dispatch(removeCart(item.id))}><FontAwesomeIcon icon={faTrash} style={{color:"red"}}  /></Button></td>
                    </tr>)}
                  </tbody>
                </table>
              </div>
              <div className="col-md-4 px-4">
                <div className='shadow rounded mt-5 p-4'>
                  <h3>Cart Summary</h3>
                  <h4>Total number of products : {cartArray?.length}</h4>
                  <h4>Grand Total : ₹{total} </h4>
                  <button onClick={handleCheckout} className='btn btn-success w-100 mt-3' >checkout</button>
                </div>
              </div>
            </div>
          </div>
          :
          <div style={{width:'100%', height:'80hv'}} className='d-flex justify-content-center align-item-center'>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png?f=webp" alt="no image" />
          </div>
          }
          <div className="col-md-1"></div>
        </div>
      </div>
          :
              <div className='mt-5 w-100 row' >
              {/* not login */}
                  <div className="col-md-2"></div>
                  <div className="col-md-8 p-4">
                      <div className='d-flex justify-content-center align-items-center flex-column'>
                          <img src={lock} alt="no image" width={'40%'} height={'40%'} className=''/>
                          <h5 className='mt-5 text-center'>Please <Link to={'/login'} className='text-danger'>Login</Link> to Explore More..</h5>
                      </div>
                  </div>
                  <div className="col-md-2"></div>
              </div>
      }
      
    </>
  )
}

export default Cart