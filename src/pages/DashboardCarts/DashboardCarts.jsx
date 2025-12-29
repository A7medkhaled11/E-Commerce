import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../../utils/api';
import Loading from '../../Components/isloading/Loading';
import { Accordion, Button, Col, ListGroup, Modal, Row } from 'react-bootstrap';
import './dashcarts.css'
import Pagination from '../../Components/Pagination/Pagination';
export default function DashboardCarts() {
    const {isDark} = useSelector(state=>state.darkmode);
    const [carts,setCarts] = useState([]); 
    const [skip,setSkip] =useState(0);
    const [total,setTotal] = useState(0);
    const [loading,setLoading] = useState(true);
    const [deleteShow , setDeleteShow] = useState(false)
    const [deleteID,setDeleteID] = useState(null);
    const limit=20;
   const currentPage = skip / limit +1 ;

    function handleChangePage (page){
        setSkip((page -1 )*limit);
      }
      function handleDeleteShow(){
  setDeleteShow(true)
}
function handleDeleteUser(){
const newCarts = carts.filter(cart=>cart.id!=deleteID);
                    setCarts(newCarts);
                    setTotal(total-1);
}
function handleDeleteClose(){
  setDeleteShow(false);
}
    async function fetchAllCarts () {
        const response = await api.get(`/carts?limit=${limit}&skip=${skip}`);
        setCarts(response.data.carts);
        setTotal(response.data.total);
try {
    
} catch (error) {
    console.log(error);
}finally{
        setLoading(false);
    }
    }
    useEffect(()=>{
        fetchAllCarts();
    },[skip])
    if(loading) return <Loading/>
  return (
    <div className='mt-4'>
        <h3>All Carts</h3>
        <h6>Total Carts: {total}</h6>
        <Accordion data-bs-theme={isDark?'dark':'light'}>
            {carts.map((item,index)=>
                <Accordion.Item key={item.id} eventKey={index}>
                  
                         <Accordion.Header>
               
                    <Row className='align-items-center justify-content-between w-100'>
                        <Col md={3}>
                      <h5 className='acc-header'>UserID: {item.userId}</h5>

                        </Col>
                        <Col md={3}> <h5 className='acc-header'>TotalProducts: {item.totalProducts}</h5></Col>
                         <Col md={3}>   <h5 className='acc-header'>TotalQuantity: {item.totalQuantity}</h5></Col>
                        <Col md={3}>
                        <h5 className='acc-header'>Total: ${item.total}</h5>
                        </Col>

               
                  
                    </Row>
                    
                  
                
               </Accordion.Header>
               
               <Accordion.Body>
                 <ListGroup>
                    {item.products.map((product)=><ListGroup.Item key={product.id}>
                           <div className='d-flex justify-content-center'>
                            <h3 className='text-primary-emphasis product-title'>{product.title}</h3></div>                
                        <Row className='align-items-center'>
                        <Col md={3}>
                        <img className='product-image' src={product.thumbnail} width='150px' height='150px' alt={`${product.title} image`} />
                        </Col>
                        <Col md={3}>
                        
                         <h4 className='font-size'>Price: ${product.price}</h4>
                         <h4 className='font-size'>Quantity: {product.quantity}</h4>
                        </Col>
                         <Col md={4}>
                        <h4 className='font-size'>Discount: {product.discountPercentage}%</h4>
                          <h4 className='font-size'>Discounted: ${product.discountedTotal}</h4>
                        
                        </Col>
                        
                        
                        <Col md={2}>
                          <h4 className='font-size'>Total: ${(product.total).toFixed(2)}</h4>
                        </Col>
                      </Row>
                    </ListGroup.Item>)}
                 </ListGroup>
               </Accordion.Body>
                 <div className='d-flex align-items-center justify-content-center m-2' >
                 <Button onClick={()=>{
                    setDeleteID(item.id);
                    handleDeleteShow();
                 }} variant='warning'>Delete</Button>
                 
                    </div>
              
                </Accordion.Item>
            )}
        </Accordion>
<Pagination limit={limit} currentpage={currentPage} handleChangePage={handleChangePage}total={total}></Pagination>
   
     <Modal className='Delete-Modal'  data-bs-theme={isDark ? 'dark' : 'light'} show={deleteShow} onHide={handleDeleteClose}>
             <Modal.Header closeButton></Modal.Header>
             <Modal.Body>
               Are you sure you want to delete this user?
             </Modal.Body>
             <Modal.Footer>
               <Button variant='secondary' onClick={handleDeleteClose} >No</Button>
                           <Button variant='primary' onClick={()=>{
                             handleDeleteUser();
                             handleDeleteClose();
                           }} >yes</Button>
   
             </Modal.Footer>
           </Modal>
    </div>
  )
}
