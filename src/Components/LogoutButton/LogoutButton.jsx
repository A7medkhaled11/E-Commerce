
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { cleaUser } from '../../Store/Slices/userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../Store/Slices/cartSlice';

export default function LogoutButton() {
  const go =useNavigate();
    const dispatch = useDispatch();
    function handleLogout(){
dispatch(cleaUser());
dispatch(clearCart());
localStorage.removeItem('userInfo');
toast.success("User Logout Successfully!");
go('/')
    }
  return (
    <Button onClick={handleLogout} className='btn-danger'>Logout</Button> 
 )
}
