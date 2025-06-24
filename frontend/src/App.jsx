import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Search from './Search';
import PrivateRoute from './privaterouth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
