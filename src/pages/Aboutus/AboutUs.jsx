import React from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux';

export default function AboutUs() {
        const {isDark} = useSelector(state=>state.darkmode);
    
  return (
    <div className='mt-4'>

      <h3>About Us</h3>
      <Card className='fst-italic ' data-bs-theme={isDark?'dark':'light'}>
        <Card.Body>
            <Card.Text>
We are an e-commerce platform dedicated to providing a smooth, secure, and enjoyable online shopping experience.
Our goal is to offer a wide range of high-quality products at competitive prices while ensuring customer satisfaction at every step.

            </Card.Text>
            <Card.Text>
                <h5>We focus on:</h5>
                <div className='d-flex flex-column'>
                    <span>Carefully selected and reliable products.</span>
                    <span>A simple and user-friendly shopping experience.</span>
                    <span>Secure ordering and payment processes.</span>
                    <span>Responsive customer support to assist users anytime.</span>
                </div>
            </Card.Text>
            <Card.Text>
                Our mission is to make online shopping more convenient, trustworthy, and accessible, while continuously improving our services to meet our customers’ needs.
            </Card.Text>
        </Card.Body>
      </Card>

    </div>
  )
}
