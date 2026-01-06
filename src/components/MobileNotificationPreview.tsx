import { Smartphone, MapPin, Clock, AlertTriangle } from 'lucide-react';

interface MobileNotificationPreviewProps {
  show: boolean;
  message?: string;
  zone?: number;
  location?: string;
}

export function MobileNotificationPreview({
  show,
  message = 'Warning: Elephant herd approaching Village A. Proceed with caution.',
  zone = 3,
  location = 'Village A, Sector 2',
}: MobileNotificationPreviewProps) {
  if (!show) return null;

  return (
    <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-color)] p-4">
      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
        <Smartphone className="w-4 h-4 text-blue-400" />
        LINE Notify Preview (Villager View)
      </h3>

      {/* Mobile phone mockup */}
      <div className="bg-[var(--bg-secondary)] rounded-2xl p-3 border-2 border-[var(--border-color)] max-w-xs mx-auto">
        {/* Phone header */}
        <div className="bg-[var(--bg-primary)] rounded-t-xl px-3 py-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">EN</span>
            </div>
            <div>
              <div className="text-xs font-medium">Elephant Network</div>
              <div className="text-[10px] text-[var(--text-secondary)]">Early Warning System</div>
            </div>
          </div>
        </div>

        {/* Notification content */}
        <div className="bg-[var(--bg-card)] rounded-lg p-3 border border-amber-500/30">
          <div className="flex items-start gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-amber-400 mb-1">Zone {zone} Alert</div>
              <p className="text-xs text-[var(--text-primary)] leading-relaxed">{message}</p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-[var(--border-color)] space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <MapPin className="w-3 h-3" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <Clock className="w-3 h-3" />
              <span>{new Date().toLocaleTimeString()} - {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <button className="w-full mt-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-xs py-2 rounded transition-colors">
            View on Map
          </button>
        </div>

        {/* Phone footer */}
        <div className="text-center mt-2">
          <div className="text-[10px] text-[var(--text-secondary)]">
            Stay safe. Keep informed.
          </div>
        </div>
      </div>
    </div>
  );
}
