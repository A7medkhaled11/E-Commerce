import {  useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { setUser } from "../../Store/Slices/userSlice";
import toast from "react-hot-toast";
export default function Login() {
const{isDark} = useSelector(state=>state.darkmode);
const [isPassword,setisPassword] = useState(true);
const [isloading,setLoading]= useState(false);
const [validated, setValidated] = useState(false);
const usernameRef= useRef();
const passwordRef= useRef();
const go = useNavigate();
const dispatch = useDispatch();




async function handleLogin(ev){
ev.preventDefault();    
 const form = ev.currentTarget;
   if (form.checkValidity() == false) {
      toast.error('username and password require');
    }
else{
    try {
    setLoading(true);
    const data = {
        username:usernameRef.current.value ,
        password:passwordRef.current.value
    }
    const response = await api.post('/auth/login',data);
    const user = response.data;
     const accessToken =user.accessToken;
    const responseRole =  await api.get('/auth/me', {headers:{Authorization:`Bearer ${accessToken}`}});
    const role = responseRole.data.role;
    const userData ={user , role};
    dispatch(setUser(userData));
    localStorage.setItem('userInfo',JSON.stringify(response.data));
    toast.success("Login Successfully!");



    go('/');
    }
 catch (error) {
    console.log(error)
 toast.error(error.response?.data?.message||'Network Error')
} finally{
    setLoading(false)
}
}
    setValidated(true);

}


return (<div className="mt-4">
    <h3>Login</h3>
      <Form data-bs-theme={isDark ? 'dark' : 'light'}  noValidate validated={validated} className="text-success fw-bolder ms-3" onSubmit={handleLogin}>
        <Form.Group className="mb-2">
            <Form.Label htmlFor="username">Username:</Form.Label>
            <Form.Control type="text" id="username" name="username"placeholder="Enter your username" required ref={usernameRef}></Form.Control>
       <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
              Please Write a Username.
            </Form.Control.Feedback>
        </Form.Group>
         <Form.Group>
            <Form.Label htmlFor="password">Password:</Form.Label>
                    <InputGroup>

            <Form.Control type={isPassword?'password':'text'} id="password" name="password"required placeholder="Enter your password" ref={passwordRef}>

            </Form.Control>
          <InputGroup.Text onClick={()=>setisPassword(prev=>!prev)}>{isPassword?<FaRegEye className="text-success" />:<FaRegEyeSlash className="text-success"/>}</InputGroup.Text>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
              Please Write a Password.
            </Form.Control.Feedback>
          </InputGroup>
        
        </Form.Group>
        <Button className="mt-3 " type="submit" disabled={isloading} variant={isloading?'secondary':'success'}>{isloading?'loading....':'login'}</Button>
    </Form>
  </div>
  
  )
}
