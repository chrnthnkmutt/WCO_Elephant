import { Map, Settings, BarChart3, Video, Sliders } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Live Dashboard', icon: Map },
    { id: 'monitoring', label: 'Analytics & CCTV', icon: BarChart3 },
    { id: 'controls', label: 'System Controls', icon: Sliders },
  ];

  return (
    <nav className="bg-[var(--bg-card)] border-b border-[var(--border-color)] py-3" style={{ marginLeft: '-60px', marginRight: '-60px', paddingLeft: '60px', paddingRight: '60px' }}>
      <div className="flex items-center gap-6">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}