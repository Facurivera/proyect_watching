import { useState } from 'react';
import API from './api';
import { useNavigate } from 'react-router-dom';
import { saveAuth } from './utils/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post('/login', { username, password });
      saveAuth(res.data.token, res.data.role);
      navigate('/search');
    } catch {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="ingreso-inicio">
      <h1 className="text-2xl font-bold inicio" >Iniciar sesión</h1>
      <input className="border p-2 formulario" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="border p-2 formulario" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="ingreso">Ingresar</button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
