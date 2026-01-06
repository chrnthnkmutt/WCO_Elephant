import { ElephantLocation, Sensor, IncidentData, SensorEvent } from '../types';

// Approximate coordinates for Northern Thailand (example area)
export const mapCenter: [number, number] = [18.8, 98.98];

// Zone boundaries (simplified polygons)
export const zones = {
  zone1: [
    [18.85, 98.95],
    [18.85, 99.01],
    [18.82, 99.01],
    [18.82, 98.95],
  ] as [number, number][],
  zone2: [
    [18.82, 98.95],
    [18.82, 99.01],
    [18.79, 99.01],
    [18.79, 98.95],
  ] as [number, number][],
  zone3: [
    [18.79, 98.95],
    [18.79, 99.01],
    [18.76, 99.01],
    [18.76, 98.95],
  ] as [number, number][],
};

export const initialElephants: ElephantLocation[] = [
  {
    id: 'E001',
    lat: 18.84,
    lng: 98.97,
    timestamp: new Date(),
    zone: 1,
    predictedPath: [
      [18.84, 98.97],
      [18.83, 98.975],
      [18.82, 98.98],
      [18.81, 98.985],
    ],
  },
  {
    id: 'E002',
    lat: 18.835,
    lng: 98.99,
    timestamp: new Date(),
    zone: 1,
  },
];

export const sensors: Sensor[] = [
  { id: 'CAM-01', name: 'Camera 01', type: 'camera', lat: 18.84, lng: 98.96, status: 'online', battery: 87, signalStrength: 95 },
  { id: 'CAM-02', name: 'Camera 02', type: 'camera', lat: 18.83, lng: 98.98, status: 'online', battery: 72, signalStrength: 88 },
  { id: 'CAM-03', name: 'Camera 03', type: 'camera', lat: 18.81, lng: 98.99, status: 'online', battery: 91, signalStrength: 92 },
  { id: 'CAM-04', name: 'Camera 04', type: 'camera', lat: 18.80, lng: 98.96, status: 'warning', battery: 23, signalStrength: 78 },
  { id: 'MOT-01', name: 'Motion 01', type: 'motion', lat: 18.845, lng: 98.975, status: 'online', battery: 95, signalStrength: 100 },
  { id: 'MOT-02', name: 'Motion 02', type: 'motion', lat: 18.825, lng: 98.985, status: 'online', battery: 88, signalStrength: 94 },
  { id: 'SEIS-01', name: 'Seismic 01', type: 'seismic', lat: 18.815, lng: 98.97, status: 'online', battery: 65, signalStrength: 89 },
  { id: 'THERM-01', name: 'Thermal 01', type: 'thermal', lat: 18.78, lng: 98.98, status: 'online', battery: 79, signalStrength: 91 },
  { id: 'CAM-05', name: 'Camera 05', type: 'camera', lat: 18.77, lng: 98.97, status: 'offline', battery: 0, signalStrength: 0 },
];

export const historicalIncidents: IncidentData[] = [
  { date: '2025-12-01', sightings: 12, incidents: 2, alerts: 15 },
  { date: '2025-12-02', sightings: 8, incidents: 1, alerts: 10 },
  { date: '2025-12-03', sightings: 15, incidents: 3, alerts: 18 },
  { date: '2025-12-04', sightings: 10, incidents: 2, alerts: 12 },
  { date: '2025-12-05', sightings: 6, incidents: 0, alerts: 8 },
  { date: '2025-12-06', sightings: 14, incidents: 4, alerts: 20 },
  { date: '2025-12-07', sightings: 11, incidents: 2, alerts: 14 },
  { date: '2025-12-08', sightings: 9, incidents: 1, alerts: 11 },
  { date: '2025-12-09', sightings: 13, incidents: 3, alerts: 16 },
  { date: '2025-12-10', sightings: 7, incidents: 1, alerts: 9 },
];

export const initialEvents: SensorEvent[] = [
  {
    id: 'EVT-001',
    type: 'cctv',
    sensorId: 'CAM-01',
    zone: 1,
    timestamp: new Date(Date.now() - 120000),
    message: 'Large animal detected - Forest Zone',
    severity: 'low',
  },
  {
    id: 'EVT-002',
    type: 'motion',
    sensorId: 'MOT-01',
    zone: 1,
    timestamp: new Date(Date.now() - 90000),
    message: 'Motion detected - Sector A',
    severity: 'medium',
  },
  {
    id: 'EVT-003',
    type: 'vibration',
    sensorId: 'SEIS-01',
    zone: 2,
    timestamp: new Date(Date.now() - 60000),
    message: 'Seismic activity - Buffer Zone',
    severity: 'high',
  },
];

// Scenario templates for simulation
export const scenarios = {
  elephantEntersZone1: {
    name: 'Elephant Enters Zone 1',
    description: 'Simulates an elephant herd entering the forest zone',
  },
  bufferZoneBreach: {
    name: 'Buffer Zone Breach',
    description: 'Elephants crossing into the buffer zone',
  },
  communityAlert: {
    name: 'Community Alert',
    description: 'Critical alert - elephants near village',
  },
  normalPatrol: {
    name: 'Normal Patrol',
    description: 'Routine elephant movement in safe areas',
  },
};
