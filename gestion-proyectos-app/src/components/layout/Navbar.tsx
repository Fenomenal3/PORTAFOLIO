import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FolderKanban, ClipboardList } from 'lucide-react';

const links = [
  { to: '/', label: 'Inicio', icon: LayoutDashboard },
  { to: '/usuarios', label: 'Usuarios', icon: Users },
  { to: '/proyectos', label: 'Proyectos', icon: FolderKanban },
  { to: '/tareas', label: 'Tareas', icon: ClipboardList },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold text-blue-400 tracking-tight">
          ⚡ TaskFlow
        </Link>

        <ul className="flex gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <Link
                to={to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${pathname === to
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}