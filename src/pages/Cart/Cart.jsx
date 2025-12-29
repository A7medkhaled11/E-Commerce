
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { addFromApi, clearCart, decreaseQty, increaseQty,  removeFromCart } from '../../Store/Slices/cartSlice';
import { IoIosRemoveCircle } from "react-icons/io";
import  './cart.css'
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { useEffect} from 'react';

export default function Cart() {
    const {cartItems , totalAmount} =useSelector(state=>state.cart);
    const {isDark} = useSelector(state=>state.darkmode);
    const dispatch = useDispatch();
    const{userInfo,isLoggIn} = useSelector(state=>state.user);
    
    async function fetchUserCarts() {
    if(!isLoggIn) return ;
      try {
        const response = await api.get(`/users/${userInfo.id}/carts`);
        if(response.data.carts.length==0) return ;
        const apiProducts =response.data.carts[0].products;
        apiProducts.forEach((item)=>
             dispatch(addFromApi(item))

      )
      } catch (error) {
        console.log(error);
      
      }
    }
    

   
    useEffect(()=>{
      fetchUserCarts();
    },[])
   
  return ( 
    
    <div className="mt-4">
    {isLoggIn?<>
      <h3 className='d-flex gap-2 align-items-center'>
                <CiShoppingCart className='fs-2 text-danger-emphasis' />
                <span>Cart</span>
            </h3>
           {cartItems.length==0?<p className={`d-flex align-items-center justify-content-center m-4 p-4 text-secondary fs-4 ${isDark?'cart-empty-dark-shadow':'shadow-lg'}`}>Your Cart is Empty.</p>:
           <>
            <ListGroup data-bs-theme={isDark?'dark':'light'}>
            {cartItems.map((item)=><ListGroup.Item key={item.id}>
                  
                <Row className='align-items-center'>
                    <Col md={3}>
                      {<img  src={item.thumbnail}alt={`${item.title} image`} width='150px' height='150px' ></img>}
                       
                    </Col>
                    <Col md={3}>
                    <h5 className='mb-0'>{item.title}</h5>
                     <p className='text-danger fw-bold mb-0'>{item?.category?.toUpperCase()}</p>
                     <h5>${item.price}</h5>
            
                    </Col>
                    <Col md={3}>
                    <Button variant={item.quantity==1?'secondary':'outline-primary'}
                    disabled={item.quantity==1}
                    onClick={()=>dispatch(decreaseQty(item.id))}
                    >-</Button>
                    <span className='m-2'>{item.quantity}</span>
                    <Button variant={item.quantity==item.stock?'secondary':'outline-primary'}
                    disabled={item.quantity==item.stock}
                    onClick={()=>dispatch(increaseQty(item.id))}>+</Button>
                    </Col>
                    <Col md={2} >
                    {<h5 className='mb-0'>${(item.quantity*item.price).toFixed(2)}</h5>}
                    </Col>
                    <Col md={1}>
                    <IoIosRemoveCircle onClick={()=>dispatch(removeFromCart(item.id))} className='fs-1 text-danger'  />
                    </Col>
                </Row>
            </ListGroup.Item>)}



            </ListGroup>
            <Card  data-bs-theme={isDark ? 'dark' : 'light'} className='mt-3 p-3'>
               <h3>Total: ${totalAmount.toFixed(2)}</h3>
               <Button onClick={()=>dispatch(clearCart())} variant='warning' className='text-center fw-bold' >Clear Cart</Button>
            </Card>
           </>
           }
           
    </>:<div className='d-flex flex-column align-items-center'>
      <p className={`d-flex align-items-center w-100 justify-content-center m-4 p-4 text-secondary fs-4 ${isDark?'cart-empty-dark-shadow':'shadow-lg'}`}>You Must Login First.</p>
      <Link to='/login'>Go to Login Page</Link>
      </div>}
          
     
    </div>
  )
}
