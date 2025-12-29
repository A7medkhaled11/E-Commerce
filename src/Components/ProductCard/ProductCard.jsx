import { MdStarRate } from "react-icons/md";
import{Card , Button} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../Store/Slices/cartSlice";
import toast from "react-hot-toast";
export default function ProductCard({product}) {
    const {isDark} =useSelector(state=>state.darkmode);
    const dispatch = useDispatch();
       const{isLoggIn} = useSelector(state=>state.user);
       const go = useNavigate();
   
  return (
    <div>
        <Card style={{height:'400px'}} data-bs-theme={isDark ? 'dark' : 'light'} >
            <Card.Img src={product?.thumbnail} width='200px' height='200px' alt={`${product.title} image`}></Card.Img>
            <Card.Body  className="d-flex flex-column">
            <Card.Title className="flex-grow-1" >{product.title}</Card.Title>
            <div className='d-flex justify-content-between align-items-center'>
             <Card.Subtitle className='text-danger'>{product.category.toUpperCase()}</Card.Subtitle>
              <Card.Subtitle className='text-danger'>{product.brand}</Card.Subtitle>
            </div>
            
            <div className='d-flex justify-content-between align-items-center '>
                <Card.Title>${product.price}</Card.Title>
                <Card.Title><span className='text-warning d-flex justify-content-center align-items-center'>{product.rating}<MdStarRate /></span></Card.Title>
            </div>
           <div className='mt-auto d-flex justify-content-center gap-2 align-items-center'>
              <Button as={Link} to={`/product-detail/${product.id}`} variant="outline-info">Show More</Button>
                   {product.stock>0? <Button onClick={()=>{
                    isLoggIn?dispatch(addToCart(product)):toast.error('You Must Login First')
                    
                  
                  }} variant="success">Add to Cart</Button>:
                    <Button disabled  variant="secondary">Out Of Stock </Button>}
                     </div>
            </Card.Body>
           
        </Card>
    </div>
  )
}
