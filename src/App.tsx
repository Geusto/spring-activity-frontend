import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import UsuariosPage from './pages/UsuariosPage';
import CarrerasTaxiPage from './pages/CarrerasTaxiPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="usuarios" element={<UsuariosPage />} />
          <Route path="carreras-taxi" element={<CarrerasTaxiPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
