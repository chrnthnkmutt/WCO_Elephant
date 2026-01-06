import { Wifi, WifiOff, Battery, BatteryWarning, Camera, Radio, Activity, Thermometer } from 'lucide-react';
import { Sensor } from '../types';

interface DeviceStatusProps {
  sensors: Sensor[];
}

export function DeviceStatus({ sensors }: DeviceStatusProps) {
  const getTypeIcon = (type: Sensor['type']) => {
    switch (type) {
      case 'camera':
        return <Camera className="w-4 h-4" />;
      case 'motion':
        return <Activity className="w-4 h-4" />;
      case 'seismic':
        return <Radio className="w-4 h-4" />;
      case 'thermal':
        return <Thermometer className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Sensor['status']) => {
    switch (status) {
      case 'online':
        return 'text-green-400 bg-green-400/10';
      case 'warning':
        return 'text-amber-400 bg-amber-400/10';
      case 'offline':
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getBatteryIcon = (battery: number) => {
    if (battery < 30) {
      return <BatteryWarning className="w-4 h-4 text-red-400" />;
    }
    return <Battery className="w-4 h-4 text-green-400" />;
  };

  const onlineCount = sensors.filter(s => s.status === 'online').length;
  const warningCount = sensors.filter(s => s.status === 'warning').length;
  const offlineCount = sensors.filter(s => s.status === 'offline').length;

  return (
    <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-color)] p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Device Status</h3>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span className="text-[var(--text-secondary)]">{onlineCount} Online</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <span className="text-[var(--text-secondary)]">{warningCount} Warning</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <span className="text-[var(--text-secondary)]">{offlineCount} Offline</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {sensors.map((sensor) => (
          <div
            key={sensor.id}
            className="bg-[var(--bg-secondary)] rounded-lg p-3 border border-[var(--border-color)]"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getTypeIcon(sensor.type)}
                <span className="text-sm font-medium">{sensor.name}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded ${getStatusColor(sensor.status)}`}>
                {sensor.status}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-1">
                {getBatteryIcon(sensor.battery || 0)}
                <span>{sensor.battery || 0}%</span>
              </div>
              <div className="flex items-center gap-1">
                {sensor.status === 'offline' ? (
                  <WifiOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Wifi className="w-4 h-4 text-green-400" />
                )}
                <span>{sensor.signalStrength || 0}%</span>
              </div>
              <div className="text-[10px] opacity-70">
                {sensor.lat.toFixed(4)}, {sensor.lng.toFixed(4)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
