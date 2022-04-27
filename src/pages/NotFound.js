import { Link } from 'react-router-dom'
import bg from '../Images/404notFoundGIF.gif'

export default function NotFound() {
  return (
      <div className='flex flex-col'>
      <button className='self-center mt-5 px-12 py-1 border border-gray-400 bg-gray-200 hover:bg-gray-700 hover:text-white hover: rounded-xl '>
        <Link to="/">
          <p className='text-2xl m-1 rounde align-middle'> 
          HOME
          </p>
        </Link>
      </button>
        <img src={bg} alt="404 Not found" className=' mx-auto w-6/12 sm:w-5/12'/>
      </div>
  );
}
