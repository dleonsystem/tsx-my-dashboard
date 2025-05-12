import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsuariosPage from "./pages/UsuariosPage";
import Home from "./pages/Home";
import PaisesPage from "./pages/PaisesPage";

const App: React.FC = () => {
  return (
    <Router>
      <nav style={{ padding: 10 }}>
        <Link to="/" style={{ marginRight: 10 }}>Inicio</Link>
        <Link to="/usuarios">Usuarios</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/paises" element={<PaisesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
