import React from 'react'
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function PrivacyPolicy() {
            const {isDark} = useSelector(state=>state.darkmode);

  return (
    <div className='mt-4'>
  
        <h3>Privacy Policy</h3>
        <Card className='fst-italic ' data-bs-theme={isDark?'dark':'light'}>
          <Card.Body>
              <Card.Text>
 Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our e-commerce platform
  
              </Card.Text>
              <Card.Text>
                  <h5>Information We Collect</h5>
                  <h6>We may collect the following information:</h6>
                  <div className='d-flex flex-column'>
                      <span>Personal details such as name, email address, and phone number.</span>
                      <span>Shipping and billing information.</span>
                      <span>Order and transaction details.</span>
                      <span>Technical data such as device type and browser information.</span>
                  </div>
              </Card.Text>
               <Card.Text>
                  <h5>How We Use Your Information</h5>
                  <h6>We use your information to:</h6>
                  <div className='d-flex flex-column'>
                      <span>Process and manage orders.</span>
                      <span>Improve our services and user experience.</span>
                      <span>Communicate with you regarding orders and updates.</span>
                      <span>Ensure platform security and prevent fraud.</span>
                  </div>
              </Card.Text>
              <Card.Text>
                <h5>Data Protection</h5>
                <span>We take appropriate security measures to protect your personal data from unauthorized access, alteration, or disclosure.</span>
              </Card.Text>
               <Card.Text>
                <h5>Third-Party Services</h5>
                <span>We may use trusted third-party services (such as payment gateways) to process transactions. These parties are obligated to protect your information.</span>
              </Card.Text>
               <Card.Text>
                <h5>Cookies</h5>
                <span>Our platform may use cookies to enhance your browsing experience and analyze site performance.</span>
              </Card.Text>
              <Card.Text>
                <h5>Changes to This Policy</h5>
                <span>We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page.</span>
              </Card.Text>
               <Card.Text>
                <h5>Contact Us</h5>
                <span>If you have any questions about this Privacy Policy, please contact us through the platform.</span>
              </Card.Text>
          </Card.Body>
        </Card>
  
      </div>
  )
}
