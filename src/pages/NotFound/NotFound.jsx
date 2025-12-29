
import { Link } from 'react-router-dom'

export default function NotFound() {

  return (
    <div className='d-flex flex-column align-items-center justify-content-center mt-5' >
        <p className={'display-5 '}>Error 404 : page Not Found </p>
    <Link to='/'>GO Back to Home Page</Link>
    </div>
  )
}
