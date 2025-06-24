import { Navigate } from 'react-router-dom';
import { getToken } from './utils/auth';

export default function PrivateRoute({ children }) {
  const token = getToken();
  return token ? children : <Navigate to="/" />;
}
