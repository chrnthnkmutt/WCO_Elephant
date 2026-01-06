export interface ElephantLocation {
  id: string;
  lat: number;
  lng: number;
  timestamp: Date;
  zone: 1 | 2 | 3;
  predictedPath?: [number, number][];
}

export interface SensorEvent {
  id: string;
  type: 'motion' | 'vibration' | 'thermal' | 'cctv';
  sensorId: string;
  zone: 1 | 2 | 3;
  timestamp: Date;
  message: string;
  severity: 'low' | 'medium' | 'high';
}

export interface Sensor {
  id: string;
  name: string;
  type: 'camera' | 'motion' | 'seismic' | 'thermal';
  lat: number;
  lng: number;
  status: 'online' | 'offline' | 'warning';
  battery?: number;
  signalStrength?: number;
}

export interface IncidentData {
  date: string;
  sightings: number;
  incidents: number;
  alerts: number;
}

export type AlertLevel = 'safe' | 'warning' | 'danger';
