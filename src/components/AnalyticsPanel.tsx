import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, AlertTriangle, Eye } from 'lucide-react';
import { IncidentData } from '../types';

interface AnalyticsPanelProps {
  data: IncidentData[];
}

export function AnalyticsPanel({ data }: AnalyticsPanelProps) {
  const totalSightings = data.reduce((sum, d) => sum + d.sightings, 0);
  const totalIncidents = data.reduce((sum, d) => sum + d.incidents, 0);
  const totalAlerts = data.reduce((sum, d) => sum + d.alerts, 0);

  return (
    <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-color)] p-4">
      <h3 className="text-sm font-medium mb-4">Analytics & Historical Data</h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-[var(--bg-secondary)] rounded-lg p-3 border border-[var(--border-color)]">
          <div className="flex items-center gap-2 mb-1">
            <Eye className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-[var(--text-secondary)]">Total Sightings</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">{totalSightings}</div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">Last 10 days</div>
        </div>

        <div className="bg-[var(--bg-secondary)] rounded-lg p-3 border border-[var(--border-color)]">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-[var(--text-secondary)]">Incidents</span>
          </div>
          <div className="text-2xl font-bold text-amber-400">{totalIncidents}</div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">Crop/property damage</div>
        </div>

        <div className="bg-[var(--bg-secondary)] rounded-lg p-3 border border-[var(--border-color)]">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-xs text-[var(--text-secondary)]">Alerts Sent</span>
          </div>
          <div className="text-2xl font-bold text-green-400">{totalAlerts}</div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">Via LINE Notify</div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-4">
        <ResponsiveContainer width="100%" height={192}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis
              dataKey="date"
              tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', color: 'var(--text-secondary)' }}
            />
            <Bar dataKey="sightings" fill="#3b82f6" name="Sightings" />
            <Bar dataKey="incidents" fill="#f59e0b" name="Incidents" />
            <Bar dataKey="alerts" fill="#10b981" name="Alerts" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend Chart */}
      <div>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis
              dataKey="date"
              tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                color: 'var(--text-primary)',
              }}
            />
            <Line
              type="monotone"
              dataKey="sightings"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 3 }}
              name="Sighting Trend"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}