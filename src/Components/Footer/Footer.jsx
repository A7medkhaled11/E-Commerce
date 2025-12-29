import { Container, Nav} from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareSnapchat } from "react-icons/fa6";
import { FaCcAmex } from "react-icons/fa6";
import { RiVisaLine } from "react-icons/ri";
import './footer.css';
import mastercardicon from '../../assets/logo.png';
import cash from '../../assets/cash-on-delivery.png';
import { Link } from 'react-router-dom';

export default function Footer() {
  const {role}= useSelector(state=>state.user)
    const {isDark} = useSelector(state=>state.darkmode);
  return (
<div className={`general-footer mt-5 d-flex align-items-center  ${role=='admin'&&'ms-1 ms-sm-2'} ${isDark ?'bg-dark':'bg-light'}`} >
  <Container className='general-container d-flex  justify-content-between align-items-center'>
    <div className='social'>
        <h4 className='text-secondary'>Connect With Us</h4>
   <div className='d-flex gap-1 ms-md-3 mb-2 '>
    <Link target='blank' to='https://www.facebook.com/?locale=ar_AR'>
    <FaFacebook  className='fs-2 text-primary' />
    </Link>
    <Link target='blank' to='https://x.com/?lang=ar'>
    <FaSquareXTwitter className='fs-2 text-black' />
    </Link>
 <Link target='blank' to='https://www.instagram.com/'>
   < FaInstagramSquare className='fs-2 text-danger' />
    </Link>
    <Link target='blank' to='https://www.snapchat.com/'>
    
<FaSquareSnapchat className='fs-2 text-warning'  />
    </Link>
    </div>
    </div>


    <div>
<Nav className='gap-2 links  '>
    <Link to='/aboutus' className='text-decoration-none text-secondary fw-bold' >AboutUs</Link>
     <Link to='/privacypolicy' className='text-decoration-none text-secondary  fw-bold'>PrivacyPolicy</Link>
     <Link to='/terms' className='text-decoration-none text-secondary fw-bold'>Terms</Link>
     <Link to='/service' className='text-decoration-none text-secondary fw-bold'>Service</Link>

</Nav>
    </div>

    <div className='d-flex gap-2 payment'>
        <img src={mastercardicon} width='40px' alt="Master Card icons" />

        <RiVisaLine className=' text-primary-emphasis icons' />
<FaCcAmex className=' icons  text-primary  '/>
        <img src={cash} width='40px' alt="cash icons" />

    </div>
 
    </Container>
</div>
  

  )
}
