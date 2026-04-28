import { useEffect, useMemo, useState } from "react";
import { useUsuarios } from "../hooks/useUsuarios";
import { useProyectos } from "../hooks/useProyectos";
import { useTareas } from "../hooks/useTareas";

export default function HomePage() {
  const { usuarios, usuariosAll, cargarTodos } = useUsuarios();
  const { proyectosAll, proyectos } = useProyectos();
  const { tareas } = useTareas();
useEffect(() => {
  cargarTodos(); 
}, []);
  const [search, setSearch] = useState("");
  const [usuarioSel, setUsuarioSel] = useState<any>(null);

  const usuariosFiltrados = useMemo(() => {
    if (!search.trim()) return [];
    return usuariosAll.filter((u) =>
      u.nombre.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, usuariosAll]);

  const kpis = useMemo(() => ({
    usuarios: usuariosAll.length,
    proyectos: proyectosAll.length,
    tareas: tareas.length,
  }), [usuarios, proyectos, tareas]);

  const proyectosUsuario = useMemo(() => {
    if (!usuarioSel) return [];
    return proyectos.filter((p) => p.usuarioId === usuarioSel.id);
  }, [usuarioSel, proyectos]);

  const normalizar = (e: string) => e?.trim().toUpperCase();

  const getStats = (id: number) => {
    const ts = tareas.filter((t) => t.proyectoId === id);

    return {
      pendiente: ts.filter(t => normalizar(t.estado) === "PENDIENTE").length,
      progreso: ts.filter(t => normalizar(t.estado) === "EN_PROGRESO").length,
      completada: ts.filter(t => normalizar(t.estado) === "COMPLETADA").length,
    };
  };

  const PieChart = ({ pendiente, progreso, completada }: any) => {
    const total = pendiente + progreso + completada;

    const p1 = total ? (pendiente / total) * 100 : 0;
    const p2 = total ? (progreso / total) * 100 : 0;

    return (
      <div className="flex items-center gap-4">
        <div
          className="w-24 h-24 rounded-full shadow"
          style={{
            background: `conic-gradient(
              #facc15 0% ${p1}%,
              #3b82f6 ${p1}% ${p1 + p2}%,
              #22c55e ${p1 + p2}% 100%
            )`,
          }}
        />
        <div className="text-xs space-y-1 text-slate-600">
          <p>🟡 {pendiente}</p>
          <p>🔵 {progreso}</p>
          <p>🟢 {completada}</p>
        </div>
      </div>
    );
  };

  const getStatsUsuario = (usuarioId: number) => {
    const proyectosU = proyectos.filter(p => p.usuarioId === usuarioId);
    const tareasU = tareas.filter(t =>
      proyectosU.some(p => p.id === t.proyectoId)
    );

    return {
      pendiente: tareasU.filter(t => normalizar(t.estado) === "PENDIENTE").length,
      progreso: tareasU.filter(t => normalizar(t.estado) === "EN_PROGRESO").length,
      completada: tareasU.filter(t => normalizar(t.estado) === "COMPLETADA").length,
    };
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-slate-500 text-sm">Usuarios</p>
          <p className="text-2xl font-bold">{kpis.usuarios}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-slate-500 text-sm">Proyectos</p>
          <p className="text-2xl font-bold">{kpis.proyectos}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-slate-500 text-sm">Tareas</p>
          <p className="text-2xl font-bold">{kpis.tareas}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow relative">
        <input
          className="w-full border p-3 rounded-lg"
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setUsuarioSel(null);
          }}
        />

        {search.trim() && !usuarioSel && (
          <div className="absolute w-full bg-white border mt-2 rounded-lg shadow max-h-40 overflow-auto z-10">
            {usuariosFiltrados.map((u) => (
              <div
                key={u.id}
                onClick={() => {
                  setUsuarioSel(u);
                  setSearch("");
                }}
                className="p-3 hover:bg-slate-100 cursor-pointer"
              >
                <p className="font-medium">{u.nombre}</p>
                <p className="text-xs text-slate-500">{u.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {usuarioSel && (
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-xl font-bold">{usuarioSel.nombre}</h2>

          <p className="text-slate-500 text-sm">
            {proyectosUsuario.length} proyectos
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {proyectosUsuario.map((p) => {
              const s = getStats(p.id);

              return (
                <div key={p.id} className="border rounded-xl p-4">
                  <h3 className="font-semibold mb-3">{p.nombre}</h3>
                  <PieChart {...s} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-lg font-bold mb-4">
          📊 Estado general por usuario
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {usuariosAll.map((u) => {
            const s = getStatsUsuario(u.id);

            return (
              <div key={u.id} className="border rounded-xl p-4">
                <p className="font-semibold mb-2">{u.nombre}</p>
                <PieChart {...s} />
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}