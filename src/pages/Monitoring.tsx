import { SimulationControls } from '../components/SimulationControls';
import { AnalyticsPanel } from '../components/AnalyticsPanel';
import { DeviceStatus } from '../components/DeviceStatus';
import { CCTVFeed } from '../components/CCTVFeed';
import { Sensor, IncidentData } from '../types';

interface MonitoringProps {
  sensors: Sensor[];
  historicalIncidents: IncidentData[];
  activeCameras: string[];
  isSimulationRunning: boolean;
  onTriggerScenario: (scenario: string) => void;
  onToggleSimulation: () => void;
  onReset: () => void;
}

export function Monitoring({
  sensors,
  historicalIncidents,
  activeCameras,
  isSimulationRunning,
  onTriggerScenario,
  onToggleSimulation,
  onReset,
}: MonitoringProps) {
  return (
    <div className="py-4">
      <div className="grid grid-cols-12 gap-4">
        {/* Left Column */}
        <div className="col-span-8 space-y-4">
          <AnalyticsPanel data={historicalIncidents} />
        </div>

        {/* Right Column */}
        <div className="col-span-4 space-y-4">
          <CCTVFeed activeCameras={activeCameras} />
        </div>
      </div>
    </div>
  );
}