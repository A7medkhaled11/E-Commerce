import{  useState } from 'react'
import {Navbar as BNavbar, Button, Container, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import LogoutButton from '../LogoutButton/LogoutButton';
import { clearDark, setDark } from '../../Store/Slices/darkmodeSlice';
export default function Navbar() {
 const dispatch = useDispatch();
const {role} = useSelector(state=>state.user);
  const [theme,setTheme] = useState(localStorage.getItem("theme")||'light');
    const [BackGroungtheme,setBackGroundTheme] = useState(localStorage.getItem("backgroundtheme")||'white');
    const [colortheme,setcolorTheme] = useState(localStorage.getItem("colortheme")||'black');

  const {isLoggIn} = useSelector(state=>state.user);
             document.body.style.backgroundColor=BackGroungtheme;
              document.body.style.color=colortheme;

             

  return (
    <BNavbar expand='lg' className={role=='admin'&&'ms-2'} bg={theme} data-bs-theme={theme}>
      <Container>
          <BNavbar.Brand as={Link} to='/'>
      <div className='d-flex align-items-center justify-content-center fs-4 gap-2'>
              <span className='text-primary'><FaShoppingCart /></span>
<span >
  E-Commerce
</span>
      </div>
      </BNavbar.Brand>
      <BNavbar.Toggle aria-controls='Navbar-Collapse'></BNavbar.Toggle>
      <BNavbar.Collapse id='Navbar-Collapse' className='justify-content-between'>
        <div className='d-flex align-items-center justify-content-center'>
         <Nav>
          <Nav.Link as={Link}to={'/'} >Home</Nav.Link>
          <Nav.Link as={Link}to={'/products'} >Products</Nav.Link>
          <Nav.Link as={Link}to={'/cart'} >Cart</Nav.Link>
            {isLoggIn&&<Nav.Link as={Link}to={'/users'} >Users</Nav.Link>}
          {isLoggIn&&<Nav.Link as={Link}to={'/profile'} >Profile</Nav.Link>}
        </Nav>
        {theme=='light'?<MdDarkMode onClick={()=>{setTheme('dark')
          localStorage.setItem('theme','dark');
             setBackGroundTheme('black');
          localStorage.setItem('backgroundtheme','black');
          dispatch(setDark())
          setcolorTheme('white');
          localStorage.setItem('colortheme','white');
             

        }} className='fs-2 ps-2 '/>:<MdOutlineLightMode onClick={()=>{setTheme('light')
          localStorage.setItem('theme','light');
                       setBackGroundTheme('white');
           localStorage.setItem('backgroundtheme','white');
           dispatch(clearDark())
           setcolorTheme('black');
                      localStorage.setItem('colortheme','black');
                          
        
        }} className='fs-2 ps-2 '/>

}
        </div>
        
        {isLoggIn?<LogoutButton></LogoutButton>:
        <div className='d-flex gap-2'>
           <Button as={Link} to='/login'>Login</Button>
          <Button variant="primary" as={Link} to='/register'>
        Register
      </Button>
        </div>
       }
        
      </BNavbar.Collapse>
      </Container>
    
    </BNavbar>
  )
}
