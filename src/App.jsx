
import { Container } from 'react-bootstrap'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { api } from './utils/api'
import { cleaUser, setUser } from './Store/Slices/userSlice'
import Loading from './Components/isloading/Loading'
import NotFound from './pages/NotFound/NotFound'
import Register from './pages/Register/Register'
import Products from './pages/Products/Products'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Cart from './pages/Cart/Cart'
import Profile from './pages/Profile/Profile'
import { clearCart } from './Store/Slices/cartSlice'
import Footer from './Components/Footer/Footer'
import Dashboard from './Components/Dashboard/Dashboard'
import DashUsers from './pages/DashboardUsers/DashUsers'
import DashProducts from './pages/DashboardProducts/DashProducts'
import DashboardCarts from './pages/DashboardCarts/DashboardCarts'
import Users from './pages/Users/Users'
import UserDetails from './pages/UserDetails/UserDetails'
import AboutUs from './pages/Aboutus/AboutUs'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import Terms from './pages/Terms/Terms'
import Service from './pages/Service/Service'
function App() {
  const [Isloading , seLoading] = useState(true);
const {isLoggIn}=useSelector(state=>state.user);
const{role} = useSelector(state=>state.user)
const dispatch = useDispatch();
  async function getAuthUser(){
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
     if(userInfo){
      const accessToken =userInfo.accessToken;
    
    const response = await api.get('/auth/me', {headers:{Authorization:`Bearer ${accessToken}`}});
    const user = response.data ;
     const role = response.data.role;
    const userData ={user , role};
    dispatch(setUser(userData));
  
      
     } 
  
  } catch (error) {
    console.log(error)
    dispatch(cleaUser());
    dispatch(clearCart());
    
    localStorage.removeItem('userInfo');
  }finally{
    seLoading(false)
  }
  }
  
useEffect(()=>{
getAuthUser();
},[])
if(Isloading){return <Loading/>}
  return (
    <div >
    <Toaster position='bottom-center'></Toaster>
    {role=='admin'&& <Dashboard></Dashboard>}
  
    <div className={`d-flex flex-column vh-100 ${role=='admin'&&'main-div'}`}>

       <Navbar></Navbar>

         <main className='flex-grow-1'>
<Container>
  <Routes>
    <Route path='/'Component={Home}/>
        <Route path='/products'Component={Products}/>
        <Route path='/product-detail/:id'Component={ProductDetails}/>
        <Route path='/cart'Component={Cart}/>
       <Route path='/aboutus'Component={AboutUs}/>
        <Route path='/privacypolicy'Component={PrivacyPolicy}/>
        <Route path='/terms'Component={Terms}/>
                <Route path='/service'Component={Service}/>



        <Route path='*'Component={NotFound}/>
        {role=='admin'&& <Route path='/Dashusers'Component={DashUsers}/>}
        {role=='admin'&& <Route path='/Dashproducts'Component={DashProducts}/>}
        {role=='admin'&& <Route path='/Dashcarts'Component={DashboardCarts}/>}

        
       

   {isLoggIn&& <Route path='/profile'Component={Profile}/>}
   {isLoggIn&& <Route path='/users'Component={Users}/>}
    {isLoggIn&& <Route path='/user-detail/:id'Component={UserDetails}/>}
   {!isLoggIn&& <Route path='/login'Component={Login}/>}
   {!isLoggIn&& <Route path='/register'Component={Register}/>}

  </Routes>
</Container>
         </main>

      <Footer ></Footer> 
    </div>
 
    </div>
  )
}

export default App
