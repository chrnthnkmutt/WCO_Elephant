import { SimulationControls } from '../components/SimulationControls';
import { DeviceStatus } from '../components/DeviceStatus';
import { Sensor } from '../types';

interface ControlsProps {
  sensors: Sensor[];
  isSimulationRunning: boolean;
  onTriggerScenario: (scenario: string) => void;
  onToggleSimulation: () => void;
  onReset: () => void;
}

export function Controls({
  sensors,
  isSimulationRunning,
  onTriggerScenario,
  onToggleSimulation,
  onReset,
}: ControlsProps) {
  return (
    <div className="py-4">
      <div className="grid grid-cols-12 gap-4">
        {/* Left Column */}
        <div className="col-span-8">
          <DeviceStatus sensors={sensors} />
        </div>

        {/* Right Column */}
        <div className="col-span-4">
          <SimulationControls
            onTriggerScenario={onTriggerScenario}
            isRunning={isSimulationRunning}
            onToggleSimulation={onToggleSimulation}
            onReset={onReset}
          />
        </div>
      </div>
    </div>
  );
}
