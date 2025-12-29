import  { useEffect, useRef, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { api } from '../../utils/api';
import Pagination from '../../Components/Pagination/Pagination';
import Loading from '../../Components/isloading/Loading';
import toast from 'react-hot-toast';
import './dashuser.css'
export default function DashUsers() {
   const {isDark}= useSelector(state=>state.darkmode);
   const [users , setUsers] = useState([]);
   const [skip,setSkip] = useState(0);
    const [total,setTotal] = useState(0);
    const[loading , setLoading] = useState(true);
    const[searchTerm , setSearchTerm] = useState('');
    const[deleteShow , setDeleteShow] = useState(false);
    const [deleteID , setDeleteID] = useState(null);
    const [show,setShow] = useState(false);
    const [update , setUpdate] = useState(false);
    const [updateID , setUpdateID] = useState(null);
    const [role ,setRole] = useState('');
   const lastNameRef = useRef();
    const firstNameRef = useRef();
   const userNameRef = useRef();
  const emailRef = useRef();
    const ageRef = useRef();
    const imageRef = useRef();
    const[gender , setGender]=useState('');
  const [validated, setValidated] = useState(false);





   const limit=30;
   const  currentpage = skip/limit +1 ;
   function handleShow(){
  setShow(true)
}
function handleClose(){
  setShow(false);
}
function handleDeleteShow(){
  setDeleteShow(true)
}
function handleDeleteClose(){
  setDeleteShow(false);
}
  function handleChangePage (page){
    setSkip((page -1 )*limit);
  }
  function value (str){
 const user =  users.find((item)=>item.id==updateID);
    return user[str];
                    
}
   async function FetchAllUsers() {
    try { 
      const response = await api.get(`/users/search?q=${searchTerm}&limit=${limit}&skip=${skip}`);
    localStorage.getItem('newUsersAdded')?setUsers(JSON.parse(localStorage.getItem('newUsersAdded')).concat(response.data.users)):setUsers(response.data.users);
      setTotal(response.data.total);
      
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
    
   }
   useEffect(()=>{
    FetchAllUsers();
   },[skip ,searchTerm])
   async function addUser(e) {
    
    try {
 e.preventDefault();
      const form = e.currentTarget;
         if (form.checkValidity() == false) {
      toast.error('All inputs are require');
    }
else{
  const ID =Date.now();
const data = {
        firstName:firstNameRef.current.value ,
        lastName: lastNameRef.current.value,
        age: ageRef.current.value,
        email: emailRef.current.value,
        username: userNameRef.current.value,
        image: imageRef.current.value ,
        role:role,
        gender:gender
      };
      const response = await api.post('/users/add',data);
      const userWithID = {...response.data,id:ID};
      setUsers([userWithID , ...users]);
      const localUsers = JSON.parse(localStorage.getItem('newUsersAdded'))||[];
      localUsers.push(userWithID);
      localStorage.setItem('newUsersAdded',JSON.stringify(localUsers));
     
      handleClose();
       setTotal(total+1);
            toast.success('User Added Successfully');
}
      
      setValidated(true);
    } catch (error) {
      
    }
    
   }
  async  function handleUpdateUser(e){
 e.preventDefault();
      const form = e.currentTarget;
         if (form.checkValidity() == false) {
      toast.error('All inputs are require');
    }
else{
const data = {
        firstName:firstNameRef.current.value ,
        lastName: lastNameRef.current.value,
        age: ageRef.current.value,
        email: emailRef.current.value,
        username: userNameRef.current.value,
        image: imageRef.current.value ,
        role:role,
      };
      let findLocalUser ;
      if( localStorage.getItem('newUsersAdded')){
         findLocalUser = JSON.parse(localStorage.getItem('newUsersAdded')).find(item=>item.id==updateID);
      }
       if(findLocalUser){
          const newUsers = users.map((item)=>{
        if(item.id==updateID){
          return {...item , ...data};
        }
        return item ;
      }) ;
          const newLocalUsers = JSON.parse(localStorage.getItem('newUsersAdded')).map((item)=>{if(item.id==findLocalUser.id) {return {...item , ...data}};
          return item ;

          }) ;
          localStorage.setItem('newUsersAdded',JSON.stringify(newLocalUsers));
                setUsers(newUsers);

        }
        else{
           try {
            const response = await api.patch(`/users/${updateID}` ,data);
            const updateUser = response.data;
             const newUsers = users.map((item)=>{
        if(item.id==updateUser.id){
          return {...item , ...updateUser};
        }
        return item ;
      }) ;
      setUsers(newUsers);
  
              } catch (error) {
               console.log(error)
                }
               }
       
       handleClose();
       setUpdate(false);
      toast.success('User Updated Successfully');

      
      
    }
    setValidated(true);
   }
  async function handleDeleteUser(){
    let findLocalUser ;
    if( localStorage.getItem('newUsersAdded')){
     findLocalUser = JSON.parse(localStorage.getItem('newUsersAdded')).find(item=>item.id==deleteID);
    }
    if(findLocalUser){
          const newUsers = JSON.parse(localStorage.getItem('newUsersAdded')).filter(item=>item.id!=findLocalUser.id) ;
          localStorage.setItem('newUsersAdded',JSON.stringify(newUsers));
          setUsers(users.filter(item=>item.id!=findLocalUser.id));
        }else{
try {
  const response =await api.delete(`/users/${deleteID}`)
  const deletedUser = response.data ;
       setUsers(users.filter(item=>item.id!=deletedUser.id));


  
} catch (error) {
  console.log(error)
}
        }
        
      
            setTotal(total-1);
            toast.success('User Deleted Successfully');
    
   }
   if(loading) return <Loading/>
  return (
    <div className="mt-4">
        <div className='header d-flex align-items-center justify-content-between mb-2'>
          <h3>All Users</h3>
          <Form  data-bs-theme={isDark ? 'dark' : 'light'}>
                    <Form.Group>
                        <Form.Control type='search' name='search' id='search' placeholder='Enter SearchTerm' onChange={(e)=>{
                            setSearchTerm(e.target.value);
                        }}></Form.Control>
                    </Form.Group>
                  </Form>
                  {!users.length==0&& <Button onClick={handleShow} variant='success'className='btn-sm' >Add New User</Button>
}
        </div>
{users.length==0?<div className='d-flex justify-content-center align-items-center mt-4 display-4'><p>No users found</p></div>:
<>
 <h6>Total Users: {total}</h6>
         <Table responsive striped bordered hover variant={isDark?'dark':'light'} >
            <thead>
                <tr>
                    <th>ID</th>
                   <th>First Name</th>
                   <th>Last Name</th>
                   <th>Age</th>
                   <th>Gender</th>
                   <th>Image</th>
                   <th>User Name</th>
                   <th>Email</th>
                  <th>Role</th>
                  <th>Edit</th>
                </tr>
            </thead>
            <tbody>
              {users.map((item)=><tr key={item.id}>
                <td>{item.id}</td>
               <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
               <td>{item.gender}</td>
                 <td><img src={item.image} width='100px' height='100px' alt={`${item.username} image`} /></td>
               <td>{item.username}</td>
                <td>{item.email}</td>
               <td>{item.role}</td>
               <td>
                 <div className='d-flex justify-content-center align-items-center'>
                  <Button onClick={()=>{
                    setUpdate(true);
                    setUpdateID(item.id);
                    handleShow();
                    
                  }} variant='danger' className='m-1 btn-sm '>Update</Button>
                   <Button onClick={()=>{
                    handleDeleteShow();
                    setDeleteID(item.id);
                   }} variant='warning' className='btn-sm'  >Delete</Button>
                 </div>

               </td>

              </tr>)}
            </tbody>
        </Table>
        <Pagination limit={limit} total={total} handleChangePage={handleChangePage} currentpage={currentpage}/>
           <Modal className='add-update-users' show={show}  data-bs-theme={isDark ? 'dark' : 'light'} onHide={()=>{
                 handleClose();
                     setUpdate(false);
             }}>
                 <Modal.Header closeButton>
         <Modal.Title>{update?'Update User':'Add User'}</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                     <Form  noValidate validated={validated} onSubmit={update?handleUpdateUser:addUser}>
                         <Form.Group>
                             <Form.Label htmlFor='email'>Email:</Form.Label>
                             <Form.Control id='email' name='email'type='email'required ref={emailRef}
                          defaultValue={update?value('email'):''}
                             ></Form.Control>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                          <Form.Control.Feedback type="invalid">
                                               Please Write a Email.
                                       </Form.Control.Feedback>
                         </Form.Group>
                         <div className='d-flex justify-content-between align-items-center gap-1'>
                               <Form.Group>
                             <Form.Label htmlFor='firstname'>FirstnName:</Form.Label>
                             <Form.Control id='firstname' name='firstname'type='text'required ref={firstNameRef}
                           defaultValue={update?value('firstName'):''}  ></Form.Control>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                           <Form.Control.Feedback type="invalid">
                                                 Please Write a FirstName.
                                               </Form.Control.Feedback>            
                         </Form.Group>
                          <Form.Group>
                             <Form.Label htmlFor='lastname'>LastName:</Form.Label>
                             <Form.Control id='lastname' name='lastame'type='text'required ref={lastNameRef}
                              defaultValue={update?value('lastName'):''}>
                                
                             </Form.Control>
                           <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                 <Form.Control.Feedback type="invalid">
                                       Please Write a LastName.
                                     </Form.Control.Feedback>                   
                         </Form.Group>
                          <Form.Group>
                             <Form.Label htmlFor='username'>UserName:</Form.Label>
                             <Form.Control id='username' name='username'type='text'required ref={userNameRef}
                              defaultValue={update?value('username'):''}>
                                
                             </Form.Control>
             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                      <Form.Control.Feedback type="invalid">
                                            Please Write a UserName.
                                          </Form.Control.Feedback>            
                         </Form.Group>
                          <Form.Group>
                             <Form.Label htmlFor='age'>Age:</Form.Label>
                             <Form.Control id='age' name='age'type='number'required ref={ageRef}
                              defaultValue={update?value('age'):''}>
                             </Form.Control>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                       <Form.Control.Feedback type="invalid">
                                             Please Write a Age.
                                           </Form.Control.Feedback>      
                         </Form.Group>
                         </div>
                          <Form.Group>
                             <Form.Label htmlFor='image'>Image:</Form.Label>
                             <Form.Control id='image' name='image'type='text'required ref={imageRef}
                                 defaultValue={update?value('image'):''}>
                           </Form.Control>
                       <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                <Form.Control.Feedback type="invalid">
                                                      Please Write a ImageLink.
                                                    </Form.Control.Feedback>   
                        </Form.Group>
                        {!update&&<div className=' gap-2 d-flex'>
                         <Form.Check type='radio'  value="male" id='Mradio' name='radio' required onChange={(e)=>setGender(e.target.value)}></Form.Check>
             <Form.Label htmlFor='Mradio'>Male</Form.Label>
             <Form.Check type='radio' value="female" id='Fradio' name='radio' required onChange={(e)=>setGender(e.target.value)}></Form.Check>
             <Form.Label htmlFor='Fradio'>Famale</Form.Label>
             
                </div>}


                           <Form.Group className='mt-2'>
                             <Form.Select onChange={(e)=>{
                              setRole(e.target.value);
                             }} id='role' name='role' required defaultValue={update?value('role'):''}>
                              <option value='' >Select Role</option>
                              <option value='admin'>Admin</option>
                              <option value='user'>User</option>
                              <option value='moderator'>Moderator</option>
                             </Form.Select>
                                
                         </Form.Group>
                        {update?<div className='d-flex justify-content-center align-items-center mt-3'>
                          <Button  variant="danger" type='submit'>
                     Update
                   </Button>
                        </div>:<div className='d-flex justify-content-center align-items-center mt-3'>
                          <Button  variant="success" type='submit'>
                     ADD
                   </Button>
                        </div>}
                     </Form>
                 </Modal.Body>
          <Modal.Footer>
                   <Button variant="secondary" onClick={()=>{
                     handleClose();
                     setUpdate(false);
                   }}>
                     Close
                   </Button>
                   
                 </Modal.Footer>
             </Modal>

        <Modal className='Delete-Modal'  data-bs-theme={isDark ? 'dark' : 'light'} show={deleteShow} onHide={handleDeleteClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this user?
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleDeleteClose} >No</Button>
                        <Button variant='primary' onClick={()=>{
                          handleDeleteUser();
                          handleDeleteClose();
                        }} >yes</Button>

          </Modal.Footer>
        </Modal>
</>}


       
    </div>
  )
}
