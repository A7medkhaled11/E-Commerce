import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function UserCard({user}) {
      const {isDark} = useSelector(state=>state.darkmode);

    
  return (
    <Card className='h-100' data-bs-theme={isDark ? 'dark' : 'light'}>
        <Card.Img src={user?.image} width='200px' height='200px' alt={`${user?.username} image`}></Card.Img>
        <Card.Body className='d-flex flex-column'>
         <Card.Title className='text-danger-emphasis fw-bold'>Name: {user?.firstName?.concat(' ',user?.lastName)}</Card.Title>
          <div className='d-flex justify-content-between align-items-center text-success-emphasis'>
            <Card.Title>Age: {user?.age}</Card.Title>
             <Card.Title>Role: {user?.role}</Card.Title>

          </div>
          <Card.Text className='fw-bold text-danger flex-grow-1'>Company: {user?.company.name}</Card.Text>
          <div className='d-flex justify-content-center align-items-center mt-auto'>
              <Button as={Link} to={`/user-detail/${user.id}`} >ShowMore</Button>
          </div>
        </Card.Body>
    </Card>
  )
}
