import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { Monitoring } from './pages/Monitoring';
import { Controls } from './pages/Controls';
import {
  mapCenter,
  initialElephants,
  sensors,
  historicalIncidents,
  initialEvents,
} from './data/mockData';
import { ElephantLocation, SensorEvent, AlertLevel } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [elephants, setElephants] = useState<ElephantLocation[]>(initialElephants);
  const [events, setEvents] = useState<SensorEvent[]>(initialEvents);
  const [alertLevel, setAlertLevel] = useState<AlertLevel>('safe');
  const [alertMessage, setAlertMessage] = useState('All zones secure. Normal monitoring active.');
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [activeCameras, setActiveCameras] = useState<string[]>([]);

  // Auto-scroll simulation
  useEffect(() => {
    if (!isSimulationRunning) return;

    const interval = setInterval(() => {
      // Simulate random sensor events
      const eventTypes: SensorEvent['type'][] = ['motion', 'vibration', 'cctv', 'thermal'];
      const severities: SensorEvent['severity'][] = ['low', 'medium', 'high'];
      const zones: (1 | 2 | 3)[] = [1, 2, 3];
      const messages = [
        'Movement detected in sector',
        'Thermal signature identified',
        'Seismic activity recorded',
        'Visual confirmation - large animal',
        'Motion sensor triggered',
      ];

      const newEvent: SensorEvent = {
        id: `EVT-${Date.now()}`,
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        sensorId: sensors[Math.floor(Math.random() * sensors.length)].id,
        zone: zones[Math.floor(Math.random() * zones.length)],
        timestamp: new Date(),
        message: messages[Math.floor(Math.random() * messages.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
      };

      setEvents((prev) => [...prev.slice(-10), newEvent]);

      // Randomly activate cameras
      if (Math.random() > 0.7) {
        const camId = `CAM-0${Math.floor(Math.random() * 4) + 1}`;
        setActiveCameras((prev) =>
          prev.includes(camId) ? prev : [...prev, camId]
        );
        setTimeout(() => {
          setActiveCameras((prev) => prev.filter((id) => id !== camId));
        }, 3000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isSimulationRunning]);

  const handleTriggerScenario = (scenario: string) => {
    switch (scenario) {
      case 'elephantEntersZone1':
        setAlertLevel('safe');
        setAlertMessage('Elephants detected in Forest Zone. Normal behavior patterns observed.');
        setShowNotification(false);
        setElephants([
          {
            id: 'E001',
            lat: 18.84,
            lng: 98.97,
            timestamp: new Date(),
            zone: 1,
            predictedPath: [
              [18.84, 98.97],
              [18.835, 98.975],
              [18.83, 98.98],
            ],
          },
          {
            id: 'E002',
            lat: 18.835,
            lng: 98.99,
            timestamp: new Date(),
            zone: 1,
          },
        ]);
        addEvent({
          id: `EVT-${Date.now()}`,
          type: 'cctv',
          sensorId: 'CAM-01',
          zone: 1,
          timestamp: new Date(),
          message: 'Elephant herd (2 adults) entering Forest Zone',
          severity: 'low',
        });
        setActiveCameras(['CAM-01']);
        setTimeout(() => setActiveCameras([]), 5000);
        break;

      case 'bufferZoneBreach':
        setAlertLevel('warning');
        setAlertMessage('WARNING: Elephants crossing into Buffer Zone. Monitoring closely.');
        setShowNotification(false);
        setElephants([
          {
            id: 'E001',
            lat: 18.81,
            lng: 98.98,
            timestamp: new Date(),
            zone: 2,
            predictedPath: [
              [18.81, 98.98],
              [18.80, 98.985],
              [18.79, 98.99],
            ],
          },
          {
            id: 'E002',
            lat: 18.805,
            lng: 98.975,
            timestamp: new Date(),
            zone: 2,
          },
          {
            id: 'E003',
            lat: 18.808,
            lng: 98.99,
            timestamp: new Date(),
            zone: 2,
          },
        ]);
        addEvent({
          id: `EVT-${Date.now()}`,
          type: 'motion',
          sensorId: 'MOT-02',
          zone: 2,
          timestamp: new Date(),
          message: 'Multiple elephants detected in Buffer Zone - Group of 3',
          severity: 'high',
        });
        setActiveCameras(['CAM-02', 'CAM-03']);
        setTimeout(() => setActiveCameras([]), 5000);
        break;

      case 'communityAlert':
        setAlertLevel('danger');
        setAlertMessage('ALERT: Elephants approaching community area. Villagers notified via LINE.');
        setShowNotification(true);
        setElephants([
          {
            id: 'E001',
            lat: 18.78,
            lng: 98.98,
            timestamp: new Date(),
            zone: 3,
            predictedPath: [
              [18.78, 98.98],
              [18.775, 98.982],
              [18.77, 98.985],
            ],
          },
          {
            id: 'E002',
            lat: 18.775,
            lng: 98.975,
            timestamp: new Date(),
            zone: 3,
          },
        ]);
        addEvent({
          id: `EVT-${Date.now()}`,
          type: 'thermal',
          sensorId: 'THERM-01',
          zone: 3,
          timestamp: new Date(),
          message: 'CRITICAL: Elephant herd near Village A - Alert dispatched',
          severity: 'high',
        });
        setActiveCameras(['CAM-04', 'CAM-05']);
        setTimeout(() => setActiveCameras(['CAM-04']), 5000);
        break;

      case 'normalPatrol':
        setAlertLevel('safe');
        setAlertMessage('All zones secure. Normal monitoring active.');
        setShowNotification(false);
        setElephants(initialElephants);
        addEvent({
          id: `EVT-${Date.now()}`,
          type: 'cctv',
          sensorId: 'CAM-01',
          zone: 1,
          timestamp: new Date(),
          message: 'Routine patrol - No unusual activity detected',
          severity: 'low',
        });
        break;
    }
  };

  const addEvent = (event: SensorEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  const handleReset = () => {
    setElephants(initialElephants);
    setEvents(initialEvents);
    setAlertLevel('safe');
    setAlertMessage('All zones secure. Normal monitoring active.');
    setIsSimulationRunning(false);
    setShowNotification(false);
    setActiveCameras([]);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]" style={{ paddingLeft: '60px', paddingRight: '60px' }}>
      {/* Header */}
      <div className="bg-[var(--bg-card)] border-b border-[var(--border-color)] py-4" style={{ marginLeft: '-60px', marginRight: '-60px', paddingLeft: '60px', paddingRight: '60px' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Elephant Monitoring & Early Warning System</h1>
              <p className="text-sm text-[var(--text-secondary)]">
                Command Center - Real-time Satellite, CCTV & Sensor Integration
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-[var(--text-secondary)]">Demo Date</div>
            <div className="text-sm font-mono">Jan 8, 2026</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Page Content */}
      {currentPage === 'dashboard' && (
        <Dashboard
          elephants={elephants}
          sensors={sensors}
          events={events}
          alertLevel={alertLevel}
          alertMessage={alertMessage}
          showNotification={showNotification}
          mapCenter={mapCenter}
        />
      )}

      {currentPage === 'monitoring' && (
        <Monitoring
          sensors={sensors}
          historicalIncidents={historicalIncidents}
          activeCameras={activeCameras}
          isSimulationRunning={isSimulationRunning}
          onTriggerScenario={handleTriggerScenario}
          onToggleSimulation={() => setIsSimulationRunning(!isSimulationRunning)}
          onReset={handleReset}
        />
      )}

      {currentPage === 'controls' && (
        <Controls
          sensors={sensors}
          isSimulationRunning={isSimulationRunning}
          onTriggerScenario={handleTriggerScenario}
          onToggleSimulation={() => setIsSimulationRunning(!isSimulationRunning)}
          onReset={handleReset}
        />
      )}
    </div>
  );
}