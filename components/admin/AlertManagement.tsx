// components/admin/AlertManagement.tsx
'use client'

import { useState } from 'react';
import { useAlerts } from '@/contexts/AlertContext';
import { Alert } from '@/data/alerts';

export default function AlertManagement() {
  const { alerts, addAlert, dismissAlert } = useAlerts();
  const [newAlert, setNewAlert] = useState({
    type: 'medium' as Alert['type'],
    message: '',
    icon: 'fa-info-circle'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAlert(newAlert);
    setNewAlert({
      type: 'medium',
      message: '',
      icon: 'fa-info-circle'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Alert Management</h2>
      
      {/* Create Alert Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Alert Type</label>
            <select
              value={newAlert.type}
              onChange={(e) => setNewAlert({...newAlert, type: e.target.value as Alert['type']})}
              className="w-full p-2 border rounded"
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Icon</label>
            <select
              value={newAlert.icon}
              onChange={(e) => setNewAlert({...newAlert, icon: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="fa-exclamation-triangle">⚠️ Warning</option>
              <option value="fa-info-circle">ℹ️ Info</option>
              <option value="fa-bell">🔔 Notification</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              value={newAlert.message}
              onChange={(e) => setNewAlert({...newAlert, message: e.target.value})}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Create Alert
          </button>
        </div>
      </form>

      {/* Active Alerts Table */}
      <div className="overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">Active Alerts</h3>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id} className="border-b">
                <td className="p-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${alert.type === 'high' ? 'bg-red-100 text-red-800' :
                      alert.type === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'}`}>
                    {alert.type}
                  </span>
                </td>
                <td className="p-3">{alert.message}</td>
                <td className="p-3">
                  {new Date(alert.timestamp).toLocaleString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}