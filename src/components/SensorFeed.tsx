import { useEffect, useRef } from 'react';
import { Camera, Activity, Radio, Thermometer } from 'lucide-react';
import { SensorEvent } from '../types';

interface SensorFeedProps {
  events: SensorEvent[];
}

export function SensorFeed({ events }: SensorFeedProps) {
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [events]);

  const getIcon = (type: SensorEvent['type']) => {
    switch (type) {
      case 'cctv':
        return <Camera className="w-4 h-4" />;
      case 'motion':
        return <Activity className="w-4 h-4" />;
      case 'vibration':
        return <Radio className="w-4 h-4" />;
      case 'thermal':
        return <Thermometer className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: SensorEvent['severity']) => {
    switch (severity) {
      case 'low':
        return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'medium':
        return 'text-amber-400 border-amber-400/30 bg-amber-400/10';
      case 'high':
        return 'text-red-400 border-red-400/30 bg-red-400/10';
    }
  };

  const getZoneColor = (zone: number) => {
    switch (zone) {
      case 1:
        return 'bg-green-500/20 text-green-400';
      case 2:
        return 'bg-amber-500/20 text-amber-400';
      case 3:
        return 'bg-red-500/20 text-red-400';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[var(--bg-card)] rounded-lg border border-[var(--border-color)]">
      <div className="px-4 py-3 border-b border-[var(--border-color)]">
        <h3 className="text-sm font-medium">Live Sensor Feed</h3>
      </div>
      
      <div
        ref={feedRef}
        className="flex-1 overflow-y-auto p-3 space-y-2"
        style={{ maxHeight: 'calc(100% - 48px)' }}
      >
        {events.length === 0 ? (
          <div className="text-center text-[var(--text-secondary)] text-sm py-8">
            No sensor events detected
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className={`p-3 rounded border ${getSeverityColor(event.severity)} transition-all duration-300 animate-in slide-in-from-bottom-2`}
            >
              <div className="flex items-start gap-2">
                <div className="mt-0.5">{getIcon(event.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono">{event.sensorId}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${getZoneColor(event.zone)}`}>
                      Zone {event.zone}
                    </span>
                  </div>
                  <p className="text-sm">{event.message}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {event.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
