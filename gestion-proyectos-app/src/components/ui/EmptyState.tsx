import type { LucideIcon } from 'lucide-react';
 
interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}
 
export default function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="text-center py-16 space-y-3">
      <div className="mx-auto w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center">
        <Icon size={28} className="text-slate-400" />
      </div>
      <p className="font-medium text-slate-700">{title}</p>
      {description && <p className="text-sm text-slate-400">{description}</p>}
    </div>
  );
}