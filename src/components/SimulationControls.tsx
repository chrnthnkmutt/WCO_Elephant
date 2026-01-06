import { Play, Pause, RotateCcw, Zap } from 'lucide-react';

interface SimulationControlsProps {
  onTriggerScenario: (scenario: string) => void;
  isRunning: boolean;
  onToggleSimulation: () => void;
  onReset: () => void;
}

export function SimulationControls({
  onTriggerScenario,
  isRunning,
  onToggleSimulation,
  onReset,
}: SimulationControlsProps) {
  return (
    <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-color)] p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-400" />
          Simulation Controls
        </h3>
        <div className="flex gap-2">
          <button
            onClick={onToggleSimulation}
            className={`px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-colors ${
              isRunning
                ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3 h-3" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                Start
              </>
            )}
          </button>
          <button
            onClick={onReset}
            className="px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] text-[var(--text-secondary)] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onTriggerScenario('elephantEntersZone1')}
          className="px-3 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 rounded text-xs transition-colors text-left"
        >
          <div className="font-medium">Zone 1 Entry</div>
          <div className="text-[10px] opacity-70 mt-0.5">Elephants in forest</div>
        </button>

        <button
          onClick={() => onTriggerScenario('bufferZoneBreach')}
          className="px-3 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 rounded text-xs transition-colors text-left"
        >
          <div className="font-medium">Buffer Breach</div>
          <div className="text-[10px] opacity-70 mt-0.5">Zone 2 crossing</div>
        </button>

        <button
          onClick={() => onTriggerScenario('communityAlert')}
          className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded text-xs transition-colors text-left"
        >
          <div className="font-medium">Community Alert</div>
          <div className="text-[10px] opacity-70 mt-0.5">Near village - Zone 3</div>
        </button>

        <button
          onClick={() => onTriggerScenario('normalPatrol')}
          className="px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded text-xs transition-colors text-left"
        >
          <div className="font-medium">Normal Patrol</div>
          <div className="text-[10px] opacity-70 mt-0.5">Routine movement</div>
        </button>
      </div>
    </div>
  );
}
