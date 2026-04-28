import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import UsuariosPage from "../pages/UsuariosPage";
import ProyectosPage from "../pages/ProyectosPage";
import TareasPage from "../pages/TareasPage";
import HomePage from "../pages/HomePage";
 
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="usuarios" element={<UsuariosPage />} />
          <Route path="proyectos" element={<ProyectosPage />} />
          <Route path="tareas" element={<TareasPage />} />
          <Route
            path="*"
            element={
              <div className="text-center py-20 text-slate-500 text-xl">
                404 — Página no encontrada
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}