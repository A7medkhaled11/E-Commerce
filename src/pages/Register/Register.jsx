import  { useRef, useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import toast from 'react-hot-toast';
import { useDispatch, useSelector} from 'react-redux'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { api } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../Store/Slices/userSlice';
export default function Register() {
    const [isPassword,setisPassword] = useState(true);
    const [isloading,setLoading]= useState(false);
    const{isDark} = useSelector(state=>state.darkmode);
    const go=useNavigate();
    const dispatch=useDispatch();
    const [gender , setGender] = useState('');
    const usernameRef = useRef();
        const firstnameRef = useRef();
    const lastnameRef = useRef();
    const passwordRef = useRef();
        const emailRef = useRef();
    const phoneRef = useRef();
        const ageRef = useRef();
            
    const bdateRef = useRef();
        const countryRef = useRef();
        const [validated, setValidated] = useState(false);


      async  function handleRegister(ev){
            ev.preventDefault();    
 const form = ev.currentTarget;
   if (form.checkValidity() == false) {
      toast.error('All inputs are require');
    }
else{
    try{setLoading(true);
        const data={
            firstName: firstnameRef.current.value,
            lastName: lastnameRef.current.value,
           age:ageRef.current.value ,
            gender: gender,
             email: emailRef.current.value,
            phone: phoneRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            birthDate: bdateRef.current.value,
            country:countryRef.current.value
        }
        const response = await api.post('/users/add',data)
        const role ='user';
        const user =response.data;
        const userData ={user,role}
dispatch(setUser(useData));
localStorage.setItem('userInfo',JSON.stringify(response.data));
    toast.success("Register Successfully!");       
    go('/') 
    }catch(error){
        console.log(error)
        toast.error(error.response?.data?.message||'Network Error')
    } finally{
        setLoading(false);
    }
}
          setValidated(true);
  }




  return (
    <div className='mt-4'>
        <h3>Register</h3>
        <Form data-bs-theme={isDark ? 'dark' : 'light'} noValidate validated={validated} className='text-primary fw-bolder ms-3' onSubmit={handleRegister}>
            <div className='d-flex justify-content-between mt-4'>
                  <Form.Group className="mb-2">
                <Form.Label htmlFor='firstname'>FirstName:</Form.Label>
                <Form.Control type='text'id='firstname' name='firstname'placeholder='Enter firstName' required ref={firstnameRef}></Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
              Please Write a FirstName.
            </Form.Control.Feedback>
            </Form.Group>
               <Form.Group className="mb-2">
                <Form.Label htmlFor='lastname'>lastName:</Form.Label>
                <Form.Control type='text'id='lastname' name='lastname'placeholder='Enter lastName' required ref={lastnameRef}></Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
              Please Write a LastName.
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label htmlFor='age'>Age:</Form.Label>
                <Form.Control type='number'id='age' name='age' placeholder='Enter Age' required ref={ageRef}></Form.Control>
           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
              Please Write a Age.
            </Form.Control.Feedback>
            </Form.Group>
             <Form.Group className="mb-2">
                <Form.Label htmlFor='phone'>Phone:</Form.Label>
                <Form.Control type='text'id='phone' name='phone' placeholder='Enter phone' required ref={phoneRef}></Form.Control>
           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
              Please Write a Phone.
            </Form.Control.Feedback>
            </Form.Group>
            </div>
            
            <Form.Group className="mb-2">
                <Form.Label htmlFor='username'>Username:</Form.Label>
                <Form.Control type='text'id='username' name='username'placeholder='Enter username' required ref={usernameRef}></Form.Control>
           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
              Please Write a UserName.
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label htmlFor='email'>Email:</Form.Label>
                <Form.Control type='email'id='email' name='email'placeholder='ahm**@gmail.com' required ref={emailRef}></Form.Control>
         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
              Please Write a Email
            </Form.Control.Feedback>
            </Form.Group>
             <Form.Group className="mb-2">
                <Form.Label htmlFor='password'>Password:</Form.Label>
                  <InputGroup>
                  <Form.Control type={isPassword?'password':'text'}id='password' name='password'placeholder='Enter password' required ref={passwordRef}></Form.Control>
           <InputGroup.Text onClick={()=>setisPassword(prev=>!prev)}>{isPassword?<FaRegEye className="text-primary" />:<FaRegEyeSlash className="text-primary"/>}</InputGroup.Text>
           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
              Please Write a Password.
            </Form.Control.Feedback>
            </InputGroup>

                
            </Form.Group>
            <div className='d-flex justify-content-between mt-4'>
                  <Form.Group className="mb-2">
                    <Form.Label >Gender:</Form.Label>
                    <div className=' gap-2 d-flex'>
                         <Form.Check type='radio' value="male" id='Mradio' name='radio' required onChange={(e)=>setGender(e.target.value)}></Form.Check>
             <Form.Label htmlFor='Mradio'>Male</Form.Label>
             <Form.Check type='radio' value="female" id='Fradio' name='radio' required onChange={(e)=>setGender(e.target.value)}></Form.Check>
             <Form.Label htmlFor='Fradio'>Famale</Form.Label>
             
                </div>
         
            </Form.Group>
               <Form.Group className="mb-2">
                <Form.Label htmlFor='bdate'>birthDate:</Form.Label>
                <Form.Control type='date'id='bdate' name='bdate' required ref={bdateRef}></Form.Control>
             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
              Please Select a BirthDate.
            </Form.Control.Feedback>
            </Form.Group>
           
             <Form.Group className="mb-2">
                <Form.Label htmlFor='country'>Country:</Form.Label>
                <Form.Control type='text'id='country' name='country'placeholder='Enter country' required ref={countryRef}></Form.Control>
           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
              Please Write a Country.
            </Form.Control.Feedback>
            </Form.Group>
            </div>
             <Button className="mt-3 " type="submit" disabled={isloading} variant={isloading?'secondary':'primary'}>{isloading?'waiting....':'register'}</Button>
        </Form>
    </div>
  )
}
