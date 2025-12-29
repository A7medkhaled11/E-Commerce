import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../../utils/api';
import { Col, Form, Row } from 'react-bootstrap';
import UserCard from '../../Components/userCard/UserCard';
import Pagination from '../../Components/Pagination/Pagination';
import Loading from '../../Components/isloading/Loading';
import './users.css'
export default function Users() {
  const {isDark} = useSelector(state=>state.darkmode);
  const [users , setUsers] = useState([]);
  const[skip,setSkip] = useState(0);
    const[total,setTotal] = useState(0);
    const [searchTerm , setSearchTerm] = useState('');
        const [sortBy , setSortBy] = useState('');
        const [typesort,setTypeSort]=useState('');
          const[isloading , setIsloading] = useState(true);
          const[filter , setFilter]=useState('');;
          const[filterValue , setFilterValue]=useState(''); ;


        


  const limit = 16 ;
 const currentPage = skip/ limit +1 ;
 function handleChangePage (page){
  setSkip((page-1)*limit) ; 
 }
 function handleTypeSort(ev){
        setTypeSort(ev.target.value);
    }
    function handleTypeFilter(e){
      setFilterValue(e.target.value);
    }
    function handleSort(e){
        setSortBy(e.target.value)
        setFilter('');
    }
    const filterOptions = {
  eyeColor: ["Brown", "Green", "Black", "Hazel"],
  gender: ["male", "female"],
  "hair.color": ["Brown", "Black"],
  role: ["admin", "user", "moderator"],
};
    function handleFilter(e){
       const selectedFilter = e.target.value;
      setFilter(selectedFilter);
      setSortBy('');
      if(filterOptions[selectedFilter]){
        setFilterValue(filterOptions[selectedFilter][0]);

      }else{
        setFilterValue('');
      }
    }
  async function fetchAllUsers() {
   
    try {
       if(filter==''){
       const response = await api.get(`/users/search?sortBy=${sortBy}&order=${typesort}&q=${searchTerm}&limit=${limit}&skip=${skip}`)
      setUsers(response.data.users);
      setTotal(response.data.total)
    } else{
 const response = await api.get(`/users/filter?key=${filter}&value=${filterValue}&limit=${limit}&skip=${skip}`)
      setUsers(response.data.users);
      setTotal(response.data.total)
    }
     
    } catch (error) {
      console.log(error)
    } finally{
      setIsloading(false);
    }
    
  }
  useEffect(()=>{fetchAllUsers();},[skip ,searchTerm,sortBy,typesort,filter,filterValue]);
  if(isloading) return <Loading/>
  return (
    <div className='mt-4'>
      <div className='d-flex justify-content-between align-items-center user-search'>
          <h3>All Users</h3>
          <Form data-bs-theme={isDark ? 'dark' : 'light'}> 
              <Form.Group >
                  <Form.Control  onChange={(e)=>{
                    setSearchTerm(e.target.value);
                  }} type='search' name='searcn' id='search' placeholder='Enter Search Term'></Form.Control>
              </Form.Group>
          </Form>
         {filter==''&& <>
         <Form data-bs-theme={isDark ? 'dark' : 'light'}> 
              <Form.Group >
                  <Form.Select  onChange={handleSort}  name='sortselect' id='sortselect'>
                                   <option value=''>SortBy</option>
                       <option value='firstName'>FirstName</option>
                      <option value='lastName'>LastName</option>
                   <option value='age'>Age</option>
                      <option value='role'>Role</option>
          
                  </Form.Select>
              </Form.Group>
          </Form>
          { sortBy!==''&&<Form data-bs-theme={isDark ? 'dark' : 'light'}> 
              <Form.Group>
                  <Form.Select value={typesort} onChange={handleTypeSort}  name='select' id='select'>
                       <option value='asc'>Asc</option>
                       <option value='desc'>Desc</option>
                  </Form.Select>
              </Form.Group>
          </Form>}
         </> 
       }
        {sortBy==''&&<>
         <Form data-bs-theme={isDark ? 'dark' : 'light'}> 
              <Form.Group >
                  <Form.Select  onChange={handleFilter}  name='filteselect' id='filterselect'>
                                   <option value=''>FilterBy</option>
                       <option value='eyeColor'>Eye Color</option>
                      <option value='gender'>Gender</option>
                      <option value='hair.color'>Hair Color</option>
                      <option value='role'>Role</option>
                  </Form.Select>
              </Form.Group>
          </Form>
          {filter&& filterOptions[filter]&&<Form data-bs-theme={isDark ? 'dark' : 'light'}> 
              <Form.Group>
                  <Form.Select value={filterValue}  onChange={handleTypeFilter}  name='eyeselect' id='eyeselect'>
                                  {filterOptions[filter].map((option , index)=><option key={index} value={option}>
                                    {option}
                                  </option>)}


                  </Form.Select>
              </Form.Group>
          </Form>}
         
                                      
                
              
        </>}
         
      </div>
      {users.length==0?<div className='d-flex justify-content-center align-items-center mt-4 display-4'><p>No users found</p></div>:
         <Row>
          {users.map(item=><Col className='g-2' key={item.id} sm={12} md={6} lg={4} xl={3}>
          <UserCard user={item} ></UserCard>
          </Col>)}
          <Pagination limit={limit} total={total}  currentpage={currentPage} handleChangePage={handleChangePage}></Pagination>
        </Row>
       
        }
        
    </div>
  )
}
