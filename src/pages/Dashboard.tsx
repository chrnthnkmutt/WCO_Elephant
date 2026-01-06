import { MapView } from '../components/MapView';
import { SensorFeed } from '../components/SensorFeed';
import { AlertStatusBar } from '../components/AlertStatusBar';
import { MobileNotificationPreview } from '../components/MobileNotificationPreview';
import { ElephantLocation, SensorEvent, AlertLevel, Sensor } from '../types';

interface DashboardProps {
  elephants: ElephantLocation[];
  sensors: Sensor[];
  events: SensorEvent[];
  alertLevel: AlertLevel;
  alertMessage: string;
  showNotification: boolean;
  mapCenter: [number, number];
}

export function Dashboard({
  elephants,
  sensors,
  events,
  alertLevel,
  alertMessage,
  showNotification,
  mapCenter,
}: DashboardProps) {
  return (
    <div className="py-4">
      <div className="mb-4" style={{ marginLeft: '-60px', marginRight: '-60px', paddingLeft: '60px', paddingRight: '60px' }}>
        <AlertStatusBar level={alertLevel} message={alertMessage} />
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Left Column - Map */}
        <div className="col-span-8">
          <div className="h-[calc(100vh-200px)] bg-[var(--bg-card)] rounded-lg border border-[var(--border-color)] overflow-hidden">
            <MapView elephants={elephants} sensors={sensors} center={mapCenter} />
          </div>
        </div>

        {/* Right Column - Feeds */}
        <div className="col-span-4 space-y-4">
          <div className="h-[calc(100vh-420px)]">
            <SensorFeed events={events} />
          </div>

          <MobileNotificationPreview show={showNotification} />
        </div>
      </div>
    </div>
  );
}
