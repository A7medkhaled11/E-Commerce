import { useRef, useState } from "react";
import { Button, Form} from "react-bootstrap";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../utils/api";
import { setUser } from "../../Store/Slices/userSlice";
import './profile.css'
export default function Profile() {
    const {userInfo ,role} = useSelector(state=>state.user);
    const [gender , setGender] = useState('');
        const [userName , setuserName] = useState('');
        const[Edit , setEdit] = useState(false);
        const dispatch = useDispatch(state=>state.user);

        const{isDark} = useSelector(state=>state.darkmode);
            const firstnameRef = useRef();
        const lastnameRef = useRef();
        
            const emailRef = useRef();
            const [isloading,setLoading]= useState(false);
        
            const [validated, setValidated] = useState(false);


           
          async function handleUpdate(ev){
            
                ev.preventDefault();
                 const form = ev.currentTarget;
                   if (form.checkValidity() == false) {
                      toast.error('All inputs are require');
                    }
                else{
                    try {
                        setLoading(true);
                        const data = {
                           firstName: firstnameRef.current.value,
            lastName: lastnameRef.current.value,
            gender: gender||userInfo.gender,
             email: emailRef.current.value,
            username: userName||userInfo.username,
                        }
                        
                        const response = await api.patch(`/users/${userInfo?.id}`,data);
                        const user = response.data;
                        const userData = {user ,role}
                        dispatch(setUser(userData));
                        localStorage.setItem('userInfo',JSON.stringify(user));
                        
                      toast.success("Update Successfully!");  
                      setEdit(false)
                    } catch (error) {
                        console.log(error);
                    }finally{
                        setLoading(false);
                    }
                }
                setValidated(true);

            }
  return (
    <div  className="mt-4">
        <div className="d-flex mb-3">
            <CgProfile className="fs-2 text-info" />
        <h3 >Profile</h3>
        </div>
{Edit?
         <Form data-bs-theme={isDark ? 'dark' : 'light'} noValidate validated={validated} className='text-info fw-bolder ms-3' onSubmit={handleUpdate}>
            <div className='d-flex justify-content-around mt-4 name-profile'>
                  <Form.Group className="mb-2">
                <Form.Label htmlFor='firstname'>FirstName:</Form.Label>
                <Form.Control  defaultValue={userInfo?.firstName} type='text'id='firstname' name='firstname'placeholder='Enter firstName' required ref={firstnameRef}></Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
              Please Write a FirstName.
            </Form.Control.Feedback>
            </Form.Group>
               <Form.Group className="mb-2">
                <Form.Label htmlFor='lastname'>lastName:</Form.Label>
                <Form.Control  defaultValue={userInfo?.lastName} type='text'id='lastname' name='lastname'placeholder='Enter lastName' required ref={lastnameRef}></Form.Control>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
              Please Write a LastName.
            </Form.Control.Feedback>
            </Form.Group>
           
           
            </div>
            
            <Form.Group className="mb-2">
                <Form.Label htmlFor='username'>Username:</Form.Label>
                <Form.Control  defaultValue={userInfo?.username} type='text'id='username' name='username'placeholder='Enter username' required onChange={(e)=>setuserName(e.target.value)}></Form.Control>
           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
              Please Write a UserName.
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
                <Form.Label htmlFor='email'>Email:</Form.Label>
                <Form.Control defaultValue={userInfo?.email} type='email'id='email' name='email'placeholder='ahm**@gmail.com' required ref={emailRef}></Form.Control>
         <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
              Please Write a Email
            </Form.Control.Feedback>
            </Form.Group>
           
            <div className='d-flex justify-content-between mt-4'>
                  <Form.Group className="mb-2">
                    <Form.Label >Gender:</Form.Label>
                    <div className=' gap-2 d-flex'>
                    <Form.Check type='radio' defaultChecked={ userInfo?.gender=='male'} value="male" id='Mradio' name='radio' required onChange={(e)=>setGender(e.target.value)}></Form.Check>
             <Form.Label htmlFor='Mradio'>Male</Form.Label>
             <Form.Check type='radio' value="female" defaultChecked={ userInfo?.gender=='female'} id='Fradio' name='radio' required onChange={(e)=>setGender(e.target.value)}></Form.Check>
             <Form.Label htmlFor='Fradio'>Famale</Form.Label>
             
                </div>
         
            </Form.Group>
             
            </div>
             <Button className="mt-3 " type="submit" disabled={isloading} variant={isloading?'secondary':'info'}>{isloading?'waiting....':'update'}</Button>
        </Form>:
        <div className={` d-flex flex-column m-auto text-info general-profile ${isDark?'bg-dark':'bg-light'}`}>
         <div className="d-flex justify-content-center">
          <img  src={userInfo?.image} width='100px' height='100px' alt={`${userInfo?.firstName} image`} />
         </div>

         
         <div className="d-flex justify-content-around profile-flex">
          <h6 className=" general-fs fw-bold">FirstName: <span className={isDark?'text-white':'text-black'}>{userInfo?.firstName}</span></h6>
            <h6 className=" general-fs fw-bold">LastName: <span className={isDark?'text-white':'text-black'}>{userInfo?.lastName}</span></h6>
         </div>
        
<div className="d-flex justify-content-around profile-flex">
   <h6 className=" general-fs fw-bold">UserName: <span className={isDark?'text-white':'text-black'}>{userInfo?.username}</span></h6>
          <h6 className=" general-fs fw-bold">Gender: <span className={isDark?'text-white':'text-black'}>{userInfo?.gender}</span></h6>
           
         </div>
         
 <div className="d-flex flex-column align-items-center">
          <h6 className="fw-bold general-fs">Email: <span className={isDark?'text-white':'text-black'}>{userInfo?.email}</span></h6>
         <Button onClick={()=>{
          setEdit(true);
         }} className="mb-3 ">Edit</Button>

         </div>

        </div>
        
        }

    </div>
  )
}
