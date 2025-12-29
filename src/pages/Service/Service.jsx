import React from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux';

export default function Service() {
      const {isDark} = useSelector(state=>state.darkmode);
    
  return (
     <div className='mt-4'>
  
        <h3>Terms of Service</h3>
        <Card className='fst-italic ' data-bs-theme={isDark?'dark':'light'}>
          <Card.Body>
              <Card.Text>
             
              </Card.Text>By accessing or using this e-commerce platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the platform.
              <Card.Text>
                  <h5>Services Provided</h5>
                  <span>We provide an online platform that allows users to browse products, place orders, and make purchases securely.</span>
              </Card.Text>
              <Card.Text>
                <h5>User Responsibilities</h5>
                <div className='d-flex flex-column'>
                      <span>Users must provide accurate and up-to-date information.</span>
                      <span>You agree not to misuse the platform or attempt to harm its functionality.</span>
                      
                  </div>
              </Card.Text>
               <Card.Text>
                  <h5>Account Termination</h5>
                      <span>We reserve the right to suspend or terminate user accounts that violate these Terms of Service without prior notice.</span>
                     
              </Card.Text>
              
               <Card.Text>
                <h5>Product Information</h5>
                <span>We strive to display accurate product descriptions and prices; however, errors may occur, and we reserve the right to correct them.</span>
              </Card.Text>
               <Card.Text>
                <h5>Payments</h5>
                <span>All payments are processed through secure third-party payment providers. We do not store sensitive payment information.</span>
              </Card.Text>
              <Card.Text>
                <h5>Service Availability</h5>
                <span>We do not guarantee uninterrupted access to the platform and may temporarily suspend services for maintenance or updates.</span>
              </Card.Text>
               <Card.Text>
                <h5>Disclaimer</h5>
                <span>The platform is provided “as is” without any warranties, express or implied.</span>
              </Card.Text>
                <Card.Text>
                <h5>Changes to the Service</h5>
                <span>We reserve the right to modify or discontinue any part of the service at any time without notice.</span>
              </Card.Text>
              <Card.Text>
              <h5>Contact Us</h5>
                <span>If you have any questions about these Terms of Service, please contact us through the platform.</span>
              </Card.Text>
          </Card.Body>
        </Card>
  
      </div>
  )
}
