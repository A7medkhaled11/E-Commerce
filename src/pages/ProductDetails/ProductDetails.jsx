import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../Components/isloading/Loading';
import { api } from '../../utils/api';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { MdStarRate } from "react-icons/md";
import { useSelector } from 'react-redux';
export default function ProductDetails() {
    const {id} = useParams();
    const[isloading , setIsloading] = useState(true);
    const [product , setProduct] = useState({});
    const {isDark} =useSelector(state=>state.darkmode)
    
     async function fetchProduct(){
        try {
            const response = await api.get(`/products/${id}`);
            
            setProduct(response.data);
        } catch (error) {
            console.log(error);
        }finally{
            setIsloading(false)
        }
     }
     useEffect(()=>{
        fetchProduct();
     },[])
     if(isloading) return <Loading/>
  return (
    <div className="mt-4">
        <h3>ProductDetails</h3>
        <ListGroup data-bs-theme={isDark ? 'dark' : 'light'} >
            <ListGroup.Item className='fw-bold  m-auto'>
              <Row className='align-items-center'>
                 <Col md={4}>
                  <h4 className='text-primary-emphasis mb-0'>{product?.title}:</h4>
                 <span className='text-primary' >{product?.description}</span>
                </Col>
                <Col md={3}>
              
                    <img src={product?.thumbnail} width='150px' height='150px' alt={`${product?.title} Image`} />
              </Col>
                <Col md={2}>
                  <p className='m-0'>
                   Price: <span>${product?.price}</span>
                </p>   
                  <p className='m-0'>Rating: <span className='text-warning'>{product?.rating}<MdStarRate /></span></p> 
                  <p className='m-0'>
                   Warranty: <span className='text-success'>{product?.warrantyInformation}</span></p>
                </Col>
                <Col md={3}>
                 <p className='m-0'>Category: <span className='text-danger'>{product?.category?.toUpperCase()}</span></p> 
                   <p className='m-0'>Brand: <span className='text-danger'>{product?.brand?.toUpperCase()}</span></p>
                   <p className='m-0'>return Policy: <span className='text-danger'>{product?.returnPolicy?.toUpperCase()}</span></p>
                </Col>
               
              </Row>
              
              
                
            </ListGroup.Item>
        </ListGroup>
    </div>
  )
}
