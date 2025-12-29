
import { Carousel, Col, Form, Row } from 'react-bootstrap'
import { Item } from '../../Constant/CarouselItem'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import ProductCard from '../../Components/ProductCard/ProductCard';
import Pagination from '../../Components/Pagination/Pagination';
import Loading from '../../Components/isloading/Loading';
import './home.css'
export default function Home() {
    const{isDark} = useSelector(state=>state.darkmode);
    const [categoryList ,setCategoryList] = useState([]);
    const [selectCategory , setSelectCategory] = useState('');
    const [Isloading,setIsLoading] = useState(false);
    const [products , setProducts] = useState([]);
    const [total,setTotal] = useState(0);
    const [skip,setSkip] = useState(0);
    const limit = 8 ;
    const currentpage = skip / limit +1;
    function handleChangePage(page) {
        setSkip((page -1)*limit) ;
    }
    async function fetchCategoryList() {
        try {
            const response = await api.get('/products/category-list')
            setCategoryList(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    async function FetchProduct() {
         
        if (selectCategory=='')  {setProducts([]); return ;}
       setIsLoading(true);
       try {
         const response = await api.get(`/products/category/${selectCategory}?limit=${limit}&skip=${skip}`);
         setProducts(response.data.products);
         setTotal(response.data.total)
       
       } catch (error) {
        console.log(error);
       } finally{
        setIsLoading(false)
       }

        
    }
    useEffect(()=>{
        fetchCategoryList();
    },[])
    useEffect(()=>{
        FetchProduct();
    },[selectCategory , skip])
  return (
    <div className="mt-4">
   <Carousel className='mb-2' data-bs-theme={isDark ? 'dark' : 'light'} >
{Item.map((item,index)=><Carousel.Item key={index}>
    <img src={item.img} alt={`${item.title} image`}></img>
    <Carousel.Caption className='fw-bold'>
        <h3>{item.title}</h3>
    <p>{item.description}</p>
    </Carousel.Caption>
</Carousel.Item> )}
   </Carousel>
   <div className='d-flex justify-content-between align-items-center mt-4 productcategory-search'>
    <h3>Product By Category</h3>
    <Form data-bs-theme={isDark ? 'dark' : 'light'}>
        <Form.Group>
            <Form.Select 
            id="categories"
            name="categories"
            value={selectCategory}
            onChange={(e)=>{
                setSelectCategory(e.target.value)
            }}
            >
                <option value="">Chose Category</option>
                {categoryList.map((item,index)=><option key={index} value={item}>
                     {item.toUpperCase()}
                </option>)}
            </Form.Select>
        </Form.Group>
    </Form>
   </div>
     
         
         {products.length == 0 ? (
          <p
            className="fs-2 text-secondary d-flex align-items-center justify-content-center"
            style={{ minHeight: "120px" }}
          >
            Please Select a Category
          </p>
        ):Isloading?<Loading></Loading>:<Row>
             {products.map((item)=><Col className='g-2' key={item.id} sm={12} md={6} lg={4} xl={3}>
          <ProductCard product={item}></ProductCard>
        </Col>)}<Pagination handleChangePage={handleChangePage} total={total} limit={limit} currentpage={currentpage}/>
        </Row>}
        
    
       
    </div>
  )
}
