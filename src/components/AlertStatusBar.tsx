import { AlertTriangle, Shield, AlertCircle } from 'lucide-react';
import { AlertLevel } from '../types';

interface AlertStatusBarProps {
  level: AlertLevel;
  message: string;
}

export function AlertStatusBar({ level, message }: AlertStatusBarProps) {
  const getStatusConfig = () => {
    switch (level) {
      case 'safe':
        return {
          icon: <Shield className="w-5 h-5" />,
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-500',
          textColor: 'text-green-400',
          label: 'ALL CLEAR',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          bgColor: 'bg-amber-500/20',
          borderColor: 'border-amber-500',
          textColor: 'text-amber-400',
          label: 'WARNING',
        };
      case 'danger':
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          bgColor: 'bg-red-500/20',
          borderColor: 'border-red-500',
          textColor: 'text-red-400',
          label: 'ALERT',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div
      className={`${config.bgColor} ${config.textColor} border-l-4 ${config.borderColor} px-4 py-3 rounded-lg flex items-center gap-3`}
    >
      <div className="flex items-center gap-2">
        {config.icon}
        <span className="font-semibold text-sm">{config.label}</span>
      </div>
      <div className="h-4 w-px bg-current opacity-30"></div>
      <p className="text-sm flex-1">{message}</p>
      <div className="text-xs opacity-70">{new Date().toLocaleTimeString()}</div>
    </div>
  );
}
