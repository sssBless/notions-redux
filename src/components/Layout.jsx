import { useDispatch } from 'react-redux';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { USER_SET } from '../redux/types';

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch({ type: USER_SET, payload: null });
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <header className='border-b-[0.2rem]'>
        <nav>
          <ul className='flex justify-end text-4xl p-8 items-center'>
            <li className='inline mx-4'>
              <NavLink to={'/'}>Home</NavLink>
            </li>
            <li className='inline mx-4'>
              <NavLink to={'notes'}>Notes</NavLink>
            </li>
            <li className='inline mx-4'>
              <Link onClick={handleLogOut}>LogOut</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className='flex justify-center min-h-[80vh]'>
        <Outlet />
      </main>
      <footer className='flex justify-between border-t-[0.2rem] p-8 text-2xl'>
        <p className='px-4'>Created by: Michael Krasnov {/* sssBless*/}</p>
        <p>Copyright &copy; 2023, Community.com, All rigthts are reserved!</p>
      </footer>
    </div>
  );
};
export { Layout };
