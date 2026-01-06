import { useState } from 'react';
import { MapPin, Navigation, Home, Trees, Mountain } from 'lucide-react';
import { ElephantLocation, Sensor } from '../types';

interface MapViewProps {
  elephants: ElephantLocation[];
  sensors: Sensor[];
  center: [number, number];
}

interface House {
  id: string;
  lat: number;
  lng: number;
  name: string;
  residents?: number;
}

export function MapView({ elephants, sensors }: MapViewProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Houses and villages in community zone
  const houses: House[] = [
    { id: 'H1', lat: 18.78, lng: 98.96, name: 'Village A - House 1', residents: 5 },
    { id: 'H2', lat: 18.78, lng: 98.97, name: 'Village A - House 2', residents: 4 },
    { id: 'H3', lat: 18.78, lng: 98.98, name: 'Village A - House 3', residents: 6 },
    { id: 'H4', lat: 18.775, lng: 98.965, name: 'Village A - House 4', residents: 3 },
    { id: 'H5', lat: 18.775, lng: 98.975, name: 'Village A - House 5', residents: 5 },
    { id: 'H6', lat: 18.77, lng: 98.97, name: 'Village B - House 1', residents: 4 },
    { id: 'H7', lat: 18.77, lng: 98.98, name: 'Village B - House 2', residents: 7 },
    { id: 'H8', lat: 18.765, lng: 98.975, name: 'Village B - House 3', residents: 5 },
    { id: 'H9', lat: 18.77, lng: 98.99, name: 'Village B - House 4', residents: 4 },
  ];

  // Convert lat/lng to pixel positions (simplified projection)
  const latLngToPixel = (lat: number, lng: number) => {
    const minLat = 18.76;
    const maxLat = 18.85;
    const minLng = 98.95;
    const maxLng = 99.01;

    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100;

    return { x, y };
  };

  // Zone definitions
  const zones = [
    {
      id: 1,
      name: 'Forest Zone',
      color: '#10b981',
      top: 0,
      height: 33.33,
      description: 'Protected Forest Area',
      icon: Trees,
    },
    {
      id: 2,
      name: 'Buffer Zone',
      color: '#f59e0b',
      top: 33.33,
      height: 33.33,
      description: 'Agricultural & Buffer Area',
      icon: Mountain,
    },
    {
      id: 3,
      name: 'Community Zone',
      color: '#ef4444',
      top: 66.66,
      height: 33.34,
      description: 'Villages & Residential Areas',
      icon: Home,
    },
  ];

  return (
    <div className="relative w-full h-full bg-[#1a2942] rounded-lg overflow-hidden">
      {/* Map background with zones */}
      <div className="absolute inset-0">
        {zones.map((zone) => {
          const IconComponent = zone.icon;
          return (
            <div
              key={zone.id}
              className="absolute inset-x-0 border-b border-white/10 transition-all"
              style={{
                top: `${zone.top}%`,
                height: `${zone.height}%`,
                backgroundColor: `${zone.color}20`,
                borderTop: `2px solid ${zone.color}40`,
              }}
            >
              <div className="absolute top-2 left-4 flex items-center gap-2 text-sm font-medium" style={{ color: zone.color }}>
                <IconComponent className="w-4 h-4" />
                Zone {zone.id}: {zone.name}
              </div>
              <div className="absolute top-7 left-4 text-xs opacity-70" style={{ color: zone.color }}>
                {zone.description}
              </div>
            </div>
          );
        })}

        {/* Roads/Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          {/* Main road through zones */}
          <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#94a3b8" strokeWidth="3" strokeDasharray="10,5" />
          
          {/* Village roads */}
          <line x1="20%" y1="75%" x2="80%" y2="75%" stroke="#94a3b8" strokeWidth="2" />
          <line x1="20%" y1="85%" x2="80%" y2="85%" stroke="#94a3b8" strokeWidth="2" />
        </svg>

        {/* Grid overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Houses */}
      {houses.map((house) => {
        const pos = latLngToPixel(house.lat, house.lng);

        return (
          <div
            key={house.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onMouseEnter={() => setHoveredItem(house.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="relative">
              <div className="w-5 h-5 bg-blue-500 border-2 border-blue-600 rounded shadow-lg flex items-center justify-center">
                <Home className="w-3 h-3 text-white" />
              </div>
              {hoveredItem === house.id && (
                <div className="absolute left-6 top-0 bg-[var(--bg-card)] border border-blue-500 rounded-lg p-2 whitespace-nowrap text-xs shadow-xl z-50">
                  <div className="font-medium text-blue-400">{house.name}</div>
                  <div className="text-[var(--text-secondary)]">Residents: {house.residents}</div>
                  <div className="text-[var(--text-secondary)] text-[10px]">
                    {house.lat.toFixed(4)}, {house.lng.toFixed(4)}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Sensors */}
      {sensors.map((sensor) => {
        const pos = latLngToPixel(sensor.lat, sensor.lng);
        const statusColor =
          sensor.status === 'online' ? '#10b981' : sensor.status === 'warning' ? '#f59e0b' : '#64748b';

        return (
          <div
            key={sensor.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onMouseEnter={() => setHoveredItem(sensor.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="relative">
              <div
                className="w-3 h-3 rounded-full border-2 shadow-lg"
                style={{
                  backgroundColor: statusColor,
                  borderColor: statusColor,
                  boxShadow: `0 0 10px ${statusColor}80`,
                }}
              />
              {hoveredItem === sensor.id && (
                <div className="absolute left-4 top-0 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-2 whitespace-nowrap text-xs shadow-xl z-50">
                  <div className="font-medium">{sensor.name}</div>
                  <div className="text-[var(--text-secondary)]">Type: {sensor.type}</div>
                  <div className="text-[var(--text-secondary)]">Status: {sensor.status}</div>
                  {sensor.battery !== undefined && (
                    <div className="text-[var(--text-secondary)]">Battery: {sensor.battery}%</div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Elephants */}
      {elephants.map((elephant) => {
        const pos = latLngToPixel(elephant.lat, elephant.lng);

        return (
          <div key={elephant.id}>
            {/* Predicted path */}
            {elephant.predictedPath && elephant.predictedPath.length > 1 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d={elephant.predictedPath
                    .map((point, i) => {
                      const p = latLngToPixel(point[0], point[1]);
                      return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
                    })
                    .join(' ')}
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  fill="none"
                  opacity="0.7"
                />
                {/* Predicted endpoint */}
                {elephant.predictedPath.length > 0 && (() => {
                  const endPoint = elephant.predictedPath[elephant.predictedPath.length - 1];
                  const endPos = latLngToPixel(endPoint[0], endPoint[1]);
                  return (
                    <circle
                      cx={endPos.x}
                      cy={endPos.y}
                      r="3"
                      stroke="#ef4444"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                      fill="none"
                      opacity="0.5"
                    />
                  );
                })()}
              </svg>
            )}

            {/* Elephant marker */}
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onMouseEnter={() => setHoveredItem(elephant.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative">
                <div className="relative">
                  <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-red-600 shadow-lg flex items-center justify-center animate-pulse">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute inset-0 w-6 h-6 rounded-full bg-red-500 animate-ping opacity-75" />
                </div>
                {hoveredItem === elephant.id && (
                  <div className="absolute left-8 top-0 bg-[var(--bg-card)] border border-red-500 rounded-lg p-2 whitespace-nowrap text-xs shadow-xl z-50">
                    <div className="font-medium text-red-400">Elephant {elephant.id}</div>
                    <div className="text-[var(--text-secondary)]">Zone {elephant.zone}</div>
                    <div className="text-[var(--text-secondary)]">
                      Last seen: {elephant.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg p-3 text-xs">
        <div className="font-medium mb-2">Map Legend</div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
              <Home className="w-2.5 h-2.5 text-white" />
            </div>
            <span>Residential House</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Elephant (Live)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Sensor (Online)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span>Sensor (Warning)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 border-t-2 border-dashed border-red-400" />
            <span>Predicted Path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-gray-400" />
            <span>Road</span>
          </div>
        </div>
      </div>

      {/* Compass */}
      <div className="absolute top-4 right-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-full p-2">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xs font-bold text-red-400">N</div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-0.5 h-6 bg-red-400 transform -translate-y-1" />
          </div>
        </div>
      </div>

      {/* Village labels */}
      <div className="absolute bottom-16 left-4 bg-blue-500/20 border border-blue-500/40 rounded-lg px-3 py-1.5 text-xs">
        <div className="text-blue-400 font-medium">Village A</div>
        <div className="text-blue-300 text-[10px]">5 houses, 23 residents</div>
      </div>

      <div className="absolute bottom-4 left-4 bg-blue-500/20 border border-blue-500/40 rounded-lg px-3 py-1.5 text-xs">
        <div className="text-blue-400 font-medium">Village B</div>
        <div className="text-blue-300 text-[10px]">4 houses, 20 residents</div>
      </div>
    </div>
  );
}