import { useSelector } from 'react-redux';
import { selectLoading, selectUserId } from '../redux/user/selectors';
import { Navigate } from 'react-router-dom';

export default function Auth({ children }) {
  const id = useSelector(selectUserId);
  const loading = useSelector(selectLoading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!id) {
    return <Navigate to={'/login'} replace />;
  }

  return children;
}
