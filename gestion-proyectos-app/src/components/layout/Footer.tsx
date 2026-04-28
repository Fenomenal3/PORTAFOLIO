export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                <p className="text-sm">© {new Date().getFullYear()} <span className="text-blue-400 font-semibold">TaskFlow</span> — Plataforma de Gestión de Proyectos</p>
                <p className="text-xs">Node.js · Express · Prisma · PostgreSQL · React</p>
            </div>
        </footer>
        );
}