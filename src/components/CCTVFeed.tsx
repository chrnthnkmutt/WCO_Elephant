import { Video, VideoOff } from 'lucide-react';

interface CCTVFeedProps {
  activeCameras: string[];
}

export function CCTVFeed({ activeCameras }: CCTVFeedProps) {
  const cameras = ['CAM-01', 'CAM-02', 'CAM-03', 'CAM-04'];

  const isActive = (cameraId: string) => activeCameras.includes(cameraId);

  return (
    <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-color)] p-4">
      <h3 className="text-sm font-medium mb-3">CCTV Feeds</h3>

      <div className="grid grid-cols-2 gap-3">
        {cameras.map((camera) => (
          <div
            key={camera}
            className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
              isActive(camera)
                ? 'border-red-500 bg-red-500/10'
                : 'border-[var(--border-color)] bg-[var(--bg-secondary)]'
            }`}
          >
            {/* Camera feed placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              {isActive(camera) ? (
                <div className="text-center">
                  <Video className="w-8 h-8 text-red-400 mx-auto mb-2 animate-pulse" />
                  <div className="text-xs text-red-400 font-medium">MOTION DETECTED</div>
                </div>
              ) : (
                <div className="text-center">
                  <VideoOff className="w-8 h-8 text-[var(--text-secondary)] mx-auto mb-2" />
                  <div className="text-xs text-[var(--text-secondary)]">Standby</div>
                </div>
              )}
            </div>

            {/* Camera label */}
            <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs font-mono">
              {camera}
            </div>

            {/* Recording indicator */}
            {isActive(camera) && (
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-500/80 px-2 py-1 rounded text-xs">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <span className="text-white font-medium">REC</span>
              </div>
            )}

            {/* Timestamp */}
            <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-[10px] font-mono">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
