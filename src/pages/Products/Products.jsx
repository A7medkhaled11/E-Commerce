import React, { useEffect, useState } from 'react'
import { api } from '../../utils/api'
import Loading from '../../Components/isloading/Loading';
import { Col, Form, Row } from 'react-bootstrap';
import ProductCard from '../../Components/ProductCard/ProductCard';
import Pagination from '../../Components/Pagination/Pagination';
import { useSelector } from 'react-redux';
import './product.css';
export default function Products() {
    const {isDark} = useSelector(state=>state.darkmode)
    const [skip , setSkip] = useState(0);
    const [total ,setTotal]=useState(0);
    const [products , setProducts]=useState([]);
    const [loading,setLoading] = useState(true);
    const [serchTerm , setSearchTerm] = useState('');
    const [sortBy,setSortBy]=useState('');
        const [typesort,setTypeSort]=useState('');

    const limit= 16;
    function handleChangePage(page){
        setSkip((page-1)*limit);
    }
    const currentpage = skip / limit +1;
    function handleSearch(ev){
        setSearchTerm(ev.target.value);
    }
      function handleTypeSort(ev){
        setTypeSort(ev.target.value);
    }
    function handleSort(e){
        setSortBy(e.target.value)
    }
    async function fetchAllProducts(){
        try {
            const response = await api.get(`/products/search?sortBy=${sortBy}&order=${typesort}&q=${serchTerm}&limit=${limit}&skip=${skip}`);
            setProducts(response.data.products);
            setTotal(response.data.total);
           
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchAllProducts();
    },[serchTerm,skip,sortBy,typesort])
    if(loading) return <Loading></Loading>;
  return (
    <div className="mt-4">
        <div className='d-flex align-items-center justify-content-between product-search'>
<h3>ALL Products</h3>
<Form data-bs-theme={isDark ? 'dark' : 'light'}> 
    <Form.Group >
        <Form.Control  onChange={handleSearch} type='search' name='searcn' id='search' placeholder='Enter Search Term'></Form.Control>
    </Form.Group>
</Form>
<Form data-bs-theme={isDark ? 'dark' : 'light'}> 
    <Form.Group >
        <Form.Select  onChange={handleSort}  name='sortselect' id='sortselect'>
                         <option value=''>SortBy</option>
             <option value='id'>Id</option>
            <option value='title'>Title</option>
         <option value='price'>price</option>
            <option value='category'>Category</option>
            <option value='rating'>Rating</option>

        </Form.Select>
    </Form.Group>
</Form>
{sortBy!==''&&<Form data-bs-theme={isDark ? 'dark' : 'light'}> 
    <Form.Group>
        <Form.Select value={typesort}  onChange={handleTypeSort}  name='select' id='select'>
                         <option value='asc'>Asc</option>
             <option value='desc'>Desc</option>
           

        </Form.Select>
    </Form.Group>
</Form>}


        </div>
        {products.length==0?<div className='d-flex justify-content-center align-items-center mt-4 display-4'><p>No products found</p></div>:
         <Row>
             {products.map((item)=><Col className='g-2' key={item.id} sm={12} md={6} lg={4} xl={3}>
          <ProductCard product={item}></ProductCard>
        </Col>)}
        <Pagination handleChangePage={handleChangePage} total={total} limit={limit} currentpage={currentpage}/>
        </Row>
        }
       
       
    </div>
  )
}
