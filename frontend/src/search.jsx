import { useEffect, useState } from 'react';
import API from './api';
import { getRole, logout } from './utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [filters, setFilters] = useState({ nombre: '', ciudad: '', cargo: '' });
  const [results, setResults] = useState([]);
  const role = getRole();
  const navigate = useNavigate();

  const fetchData = async () => {
    const params = {};
    Object.entries(filters).forEach(([key, val]) => {
      if (val) params[key] = val;
    });

    const res = await API.get('/search', { params });
    setResults(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="ingreso-inicio">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold inicio">Buscador</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 margen" >
        <input className="border p-2 formulario" placeholder="Nombre" onChange={e => setFilters({ ...filters, nombre: e.target.value })} />
        <input className="border p-2 formulario" placeholder="Ciudad" onChange={e => setFilters({ ...filters, ciudad: e.target.value })} />
        <input className="border p-2 formulario" placeholder="Cargo" onChange={e => setFilters({ ...filters, cargo: e.target.value })} />
      </div>

      <button onClick={fetchData} className="ingreso margen">Buscar</button>

      <table className="w-full border margen">
        <thead>
          <tr className="bg-gray-200 margen">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Ciudad</th>
            {role !== 'basico' && <th className="border p-2">Cargo</th>}
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i} className="text-center margen">
              <td className="border p-2">{r.nombre}</td>
              <td className="border p-2">{r.ciudad}</td>
              {role !== 'basico' && <td className="border p-2">{r.cargo}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleLogout} className="ingreso">Cerrar sesión</button>
    </div>
  );
}