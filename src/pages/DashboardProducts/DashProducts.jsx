import { useEffect, useRef, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { api } from '../../utils/api';
import Pagination from '../../Components/Pagination/Pagination';
import Loading from '../../Components/isloading/Loading';
import toast from 'react-hot-toast';
import './dashproduct.css';
export default function DashProducts() {
    const {isDark}= useSelector(state=>state.darkmode);
     const [products , setProducts] = useState([]);
       const [skip,setSkip] = useState(0);
        const [total,setTotal] = useState(0);
         const[loading , setLoading] = useState(true);
         const [show,setShow] = useState(false);
         const [searchTerm , setSearchTerm] = useState('');
         const titleRef = useRef();
         const priceRef = useRef();
         const stockRef = useRef();
         const brandRef = useRef();
         const categoryRef = useRef();
         const descriptionRef = useRef();
            const thumbnailRef = useRef();
               const [deleteShow,setDeleteShow] = useState(false);
               const[deleteID,setDeleteID]=useState(null);
                const[updateID,setUpdateID]=useState(null);
              const[update,setUpdate]=useState(false);
               const [validated, setValidated] = useState(false);
              


               

function value (str){
 const product =  products.find((item)=>item.id==updateID);
    return product[str];
                    
}

       const limit=30;
       function handleClose(){
        setShow(false);
       }
       function handleShow(){
        setShow(true);
       }
       function handleDeleteClose(){
        setDeleteShow(false);
       }
       
       const  currentpage = skip/limit +1 ;
    
      function handleChangePage (page){
        setSkip((page -1 )*limit);
      }
       async function FetchAllProducts() {
        try { 
          const response = await api.get(`/products/search?q=${searchTerm}&limit=${limit}&skip=${skip}`);
           
                
          localStorage.getItem('newAddedProducts')?setProducts( JSON.parse(localStorage.getItem('newAddedProducts')).concat(
           
        response.data.products  )):setProducts(response.data.products)
          

          setTotal(response.data.total);

          
        } catch (error) {
          console.log(error);
        }finally{
            setLoading(false);
        }
        
       }
       useEffect(()=>{
        FetchAllProducts();
       },[skip , searchTerm]); 
       
       async function addProduct(e) {
        
        try {
             e.preventDefault();
        const form = e.currentTarget;
         if (form.checkValidity() == false) {
      toast.error('All inputs are require');
    }
else{
const ID = Date.now();
 const data = {
                title:titleRef.current.value,
                category:categoryRef.current.value,
                brand:brandRef.current.value,
                price:parseFloat(priceRef.current.value),
                description:descriptionRef.current.value,
                thumbnail:thumbnailRef.current.value,
                stock:parseInt(stockRef.current.value)
            }
            const response = await api.post('/products/add',data);
            const productWithId = {...response.data , id:ID};
          setProducts(prev => [productWithId, ...prev]);
          const storeProduct = JSON.parse(localStorage.getItem('newAddedProducts'))||[];
          storeProduct.push(productWithId);
          localStorage.setItem('newAddedProducts',JSON.stringify(storeProduct));
         
            setShow(false);
                    setTotal(total+1);
                          toast.success('Product Added Successfully');

}
           
                     setValidated(true);


        } catch (error) {
           console.log(error) 
        }
        
       }

   async function handleUpdateProduct(e){
      e.preventDefault();
        const form = e.currentTarget;
         if (form.checkValidity() == false) {
      toast.error('All inputs are require');
    }
else{
   const data = {
        title:titleRef.current.value,
        category:categoryRef.current.value,
        brand:brandRef.current.value,
        price:parseFloat(priceRef.current.value),
        description:descriptionRef.current.value,
        thumbnail:thumbnailRef.current.value,
        stock:parseInt(stockRef.current.value)
                        }      
          let findProduct;
         if(localStorage.getItem('newAddedProducts')){
            findProduct = JSON.parse(localStorage.getItem('newAddedProducts')).find((item)=>item.id==updateID);
                       }
        if(findProduct) {
           let localproducts = JSON.parse(localStorage.getItem('newAddedProducts')) ;
             const productsBefor = products.map((item)=>{
          if(item.id==findProduct.id) { return {...item,...data};}
                return item ;
            })
            setProducts(productsBefor);  
           localproducts = localproducts.map((item)=>{
                if(item.id==findProduct.id) { return {...item,...data};}
                else return item ;
                      });
         
          
               localStorage.setItem('newAddedProducts',JSON.stringify(localproducts));
            
           } else{
               try {
                const response = await api.patch(`/products/${updateID}`);
                const updateProduct = response.data;
                const productsBefor = products.map((item)=>{
          if(item.id==updateProduct.id) { return {...item,...data};}
                return item ;
            })
             setProducts(productsBefor); 
                
               } catch (error) {
                console.log(error);
               }
           }              
      
      setShow(false);
      setUpdate(false);
      toast.success('Product Updated Successfully');
}
                     setValidated(true);

     
        }

   async function handleDeleteProduct(id){
    let findLocalProduct;
    if(localStorage.getItem('newAddedProducts')) {
  findLocalProduct = JSON.parse(localStorage.getItem('newAddedProducts')).find((item)=>item.id==id);
    }
  
     if(findLocalProduct) {
      const newproducts=JSON.parse(localStorage.getItem('newAddedProducts')).filter((item)=>item.id!=findLocalProduct.id);
      localStorage.setItem('newAddedProducts',JSON.stringify(newproducts));
      setProducts(products.filter((item)=>item.id!=findLocalProduct.id));
      
                } else{
                  try {
          const response = await api.delete(`/products/${id}`);
          const deletedProduct = response.data ;
          setProducts(products.filter((item)=>item.id!=deletedProduct.id));
        
          
        } catch (error) {
          console.log(error)
        }
                }
               setTotal(total-1);
      toast.success('Product Deleted Successfully');

              }

       if(loading) return <Loading/>
  return (
    <div className="mt-4">
        <div className='header d-flex align-items-center justify-content-between'>
          <h3>All Products</h3>
          <Form  data-bs-theme={isDark ? 'dark' : 'light'}>
            <Form.Group>
                <Form.Control type='search' name='search' id='search' placeholder='Enter SearchTerm' onChange={(e)=>{
                    setSearchTerm(e.target.value);
                }}></Form.Control>
            </Form.Group>
          </Form>
       {!products.length==0&& <Button variant='success' onClick={handleShow} className='btn-sm'>Add New Product</Button>}
        </div>
                 {products.length==0?<div className='d-flex justify-content-center align-items-center mt-4 display-4'><p>No products found</p></div>:<>
                  <h6>Total Products: {total}</h6>

        <Table responsive striped bordered hover variant={isDark?'dark':'light'} >
            <thead>
                <tr>
                      <th>ID</th>
                   <th>Title</th>
                   <th>Category</th>
                   <th>Brand</th>
                   <th>Price</th>
                   <th>Description</th>
                   <th>Thumbnail</th>
                  <th>stock</th>
                  <th>Edit</th>
                </tr>
            </thead>
 <tbody >
              {products.map((item,index)=><tr key={index}>
                <td>{item.id}</td>
               <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.brand}</td>
               <td>{item.price}</td>
               <td>{item.description}</td>
                <td><img src={item.thumbnail} width='100px' height='100px' alt={`${item.title} image`} /></td>
               <td>{item.stock}</td>
               <td>
                 <div className='d-flex justify-content-center align-items-center'>
                  <Button onClick={()=>{
                   setUpdate(true);
                    setShow(true);
                     setUpdateID(item.id);
                  }} variant='danger' className='m-1 btn-sm '>Update</Button>
                   <Button onClick={()=>{
                     setDeleteShow(true);
                     setDeleteID(item.id);
                   }} variant='warning' className='btn-sm'  >Delete</Button>
                 </div>

               </td>

              </tr>)}
            </tbody>

        </Table>
        <Pagination limit={limit} total={total} currentpage={currentpage} handleChangePage={handleChangePage}></Pagination>
    <Modal  className='add-update-products' show={show}  data-bs-theme={isDark ? 'dark' : 'light'} onHide={()=>{
        handleClose();
            setUpdate(false);
    }}>
        <Modal.Header closeButton>
<Modal.Title>{update?'Update Product':'Add Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate validated={validated} onSubmit={update?handleUpdateProduct:addProduct} >
                <Form.Group>
                    <Form.Label htmlFor='title'>Title:</Form.Label>
                    <Form.Control id='title' name='title'type='text' required ref={titleRef}
                 defaultValue={update?value('title'):''}
                    ></Form.Control>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                  Please Write a Title.
                                </Form.Control.Feedback>
                </Form.Group>
                <div className='d-flex justify-content-between align-items-center gap-1'>
                      <Form.Group>
                    <Form.Label htmlFor='category'>Category:</Form.Label>
                    <Form.Control id='category' name='category'type='text'required ref={categoryRef}
                  defaultValue={update?value('category'):''}  ></Form.Control>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                                Please Write a Category.
                              </Form.Control.Feedback>
                </Form.Group>
                 <Form.Group>
                    <Form.Label htmlFor='brand'>Brand:</Form.Label>
                    <Form.Control id='brand' name='brand'type='text'required ref={brandRef}
                     defaultValue={update?value('brand'):''}>
                    </Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                                Please Write a Brand.
                              </Form.Control.Feedback>
                </Form.Group>
                 <Form.Group>
                    <Form.Label htmlFor='price'>Price:</Form.Label>
                    <Form.Control id='price' name='price'type='text'required ref={priceRef}
                     defaultValue={update?value('price'):''}>
                    </Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                                Please Write a Price.
                              </Form.Control.Feedback>
                </Form.Group>
                 <Form.Group>
                    <Form.Label htmlFor='stock'>Stock:</Form.Label>
                    <Form.Control id='stock' name='stock'type='number'required ref={stockRef}
                     defaultValue={update?value('stock'):''}>
                    </Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                                Please Write a Stock.
                              </Form.Control.Feedback>
                </Form.Group>
                </div>
                 <Form.Group>
                    <Form.Label htmlFor='description'>Description:</Form.Label>
                    <Form.Control id='description' name='description'type='text'required ref={descriptionRef}
                        defaultValue={update?value('description'):''}>
                    </Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                                Please Write a Description.
                              </Form.Control.Feedback>
                </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor='thumbnail'>Thumbnail:</Form.Label>
                    <Form.Control id='thumbnail' name='thumbnail'type='text'required ref={thumbnailRef}
                    defaultValue={update?value('thumbnail'):''}></Form.Control>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                                Please Write a Thumbnail.
                              </Form.Control.Feedback>
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
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            No
          </Button>
          <Button variant="primary" onClick={()=>{
handleDeleteProduct(deleteID);
 handleDeleteClose()
          }}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
                 </>}
    </div>
  )
}
