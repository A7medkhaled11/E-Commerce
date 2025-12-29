import React, { useEffect, useState } from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../Components/isloading/Loading';
import { api } from '../../utils/api';

export default function UserDetails() {
  const {id} = useParams();
    const {isDark} = useSelector(state=>state.darkmode);
      const[isloading , setIsloading] = useState(true);
        const [user , setUser] = useState({});
    async function fetchUser() {
      try {
        const response = await api.get(`/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.log(error)
      }finally{
        setIsloading(false);
      }
    }
    useEffect(()=>{
      fetchUser();
    },[])
  if(isloading) return <Loading/>
  return (
    <div className='mt-4'>
        <h3>UserDetails</h3>
         <ListGroup data-bs-theme={isDark ? 'dark' : 'light'} >
            <ListGroup.Item className='fw-bold m-auto'>
              <Row className='align-items-center'>
                 <Col md={3}> 
                    <img src={user?.image} width='150px' height='150px' alt={`${user?.firstName} Image`} />
                    <h4 className='text-primary-emphasis'> {user?.firstName?.concat(' ',user?.lastName)}</h4>
              </Col>
                 <Col md={3}>
               <p className='m-0'>Age: <span className='text-danger-emphasis'>{user?.age}</span></p>
            <p className='m-0'>Gender: <span className='text-danger-emphasis'>{user?.gender}</span></p>
               <p className='m-0'>Role: <span className='text-danger-emphasis' >{user?.role}</span></p>

                </Col>
                <Col md={3} >
                    <p className='m-0'>Company: <span className='text-warning-emphasis'  >{user?.company?.name}</span></p> 
                 <p className='m-0 '>Department: <span className='text-warning-emphasis'>{user?.company?.department?.toUpperCase()}</span></p> 
                   <p className='m-0'>Job Title: <span className='text-warning-emphasis'>{user?.company?.title}</span></p>
                    
                </Col>
                <Col md={3} >
                  <p className='m-0'> Country: <span className='text-success-emphasis'>{user?.address?.country}</span></p>   
               <p className='m-0'>University: <span className='text-success-emphasis'>{user?.university}</span></p>
                </Col>
              </Row>
              
              
                
            </ListGroup.Item>
        </ListGroup>
    </div>
  )
}
