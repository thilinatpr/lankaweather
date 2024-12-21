// components/admin/AlertStats.tsx
'use client'

import { useAlerts } from '@/contexts/AlertContext';

export default function AlertStats() {
  const { alerts } = useAlerts();

  const stats = {
    total: alerts.length,
    high: alerts.filter(a => a.type === 'high').length,
    medium: alerts.filter(a => a.type === 'medium').length,
    low: alerts.filter(a => a.type === 'low').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Alerts</h3>
        <p className="text-2xl font-bold">{stats.total}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">High Priority</h3>
        <p className="text-2xl font-bold text-red-500">{stats.high}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Medium Priority</h3>
        <p className="text-2xl font-bold text-yellow-500">{stats.medium}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Low Priority</h3>
        <p className="text-2xl font-bold text-green-500">{stats.low}</p>
      </div>
    </div>
  );
}