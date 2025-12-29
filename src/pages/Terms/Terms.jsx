import React from 'react'
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function Terms() {
  const {isDark} = useSelector(state=>state.darkmode);

  return (
     <div className='mt-4'>
  
        <h3>Terms & Conditions</h3>
        <Card className='fst-italic ' data-bs-theme={isDark?'dark':'light'}>
          <Card.Body>
              <Card.Text>
               By using this e-commerce platform, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully before using our services.
  
              </Card.Text>
              <Card.Text>
                  <h5>Use of the Platform</h5>
                  <span>You agree to use this platform for lawful purposes only and not to violate any applicable laws or regulations.</span>
              </Card.Text>
               <Card.Text>
                  <h5>User Accounts</h5>
                      <span>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</span>
                     
              </Card.Text>
              <Card.Text>
                <h5>Orders & Payments</h5>
                <div className='d-flex flex-column'>
                      <span>All orders are subject to availability and confirmation.</span>
                      <span>Prices and product details may change without prior notice.</span>
                      <span>Payments must be completed through the available secure payment methods.</span>
                  </div>
              </Card.Text>
               <Card.Text>
                <h5>Shipping & Delivery</h5>
                <span>We aim to deliver products within the estimated time; however, delays may occur due to external factors beyond our control.</span>
              </Card.Text>
               <Card.Text>
                <h5>Returns & Refunds</h5>
                <span>Returns and refunds are subject to our return policy. Products must be returned in their original condition.</span>
              </Card.Text>
              <Card.Text>
                <h5>Intellectual Property</h5>
                <span>All content on this platform, including text, images, logos, and designs, is the property of the platform and may not be used without permission.</span>
              </Card.Text>
               <Card.Text>
                <h5>Limitation of Liability</h5>
                <span>We are not responsible for any indirect or consequential damages resulting from the use of this platform.</span>
              </Card.Text>
                <Card.Text>
                <h5>Changes to Terms</h5>
                <span>We reserve the right to update these Terms & Conditions at any time. Continued use of the platform means you accept any changes.</span>
              </Card.Text>
              <Card.Text>
              <h5>Contact Us</h5>
                <span>If you have any questions regarding these Terms & Conditions, please contact us through the platform.</span>
              </Card.Text>
          </Card.Body>
        </Card>
  
      </div>
  )
}
