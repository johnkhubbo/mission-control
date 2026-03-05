'use client';

import { useState, useEffect } from 'react';

interface Data {
  tasks: Array<{id: string | number, title: string, status: string, due: string, agent: string}>;
  approvals: Array<{id: string | number, title: string, status: string, requested: string}>;
  schedules: Array<{id: string | number, title: string, time: string, next: string}>;
  documents: Array<{id: number, title: string, generated: string}>;
  activity: Array<{time: string, event: string, type: string}>;
  _meta?: {
    fetchedAt: string;
    source: string;
  };
}

export default function Dashboard() {
  const [data, setData] = useState<Data>({tasks: [], approvals: [], schedules: [], documents: [], activity: []});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch('/api/data', { 
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      });
      const newData = await response.json();
      setData(newData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const tasksToday = data.tasks.filter(t => {
    try {
      return new Date(t.due).toDateString() === new Date().toDateString();
    } catch {
      return false;
    }
  }).length;
  
  const pendingApprovals = data.approvals.filter(a => a.status === 'pending').length;
  const activeSchedules = data.schedules.length;
  const docsGenerated = data.documents.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Mission Control...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mission Control</h1>
          <p className="mt-2 text-gray-600">
            Autonomous agent monitoring and approval dashboard
          </p>
        </div>
        <div className="text-right">
          <button 
            onClick={fetchData}
            disabled={isRefreshing}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isRefreshing ? '🔄 Refreshing...' : '🔄 Refresh'}
          </button>
          {lastUpdated && (
            <p className="text-xs text-gray-500 mt-2">
              Last updated: {lastUpdated.toLocaleTimeString()}
              {data._meta?.source && ` (${data._meta.source})`}
            </p>
          )}
        </div>
      </div>

      {isRefreshing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center space-x-3">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm text-blue-700">Syncing with Airtable...</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Tasks Today" value={tasksToday.toString()} icon="📋" color="blue" />
        <StatCard title="Pending Approvals" value={pendingApprovals.toString()} icon="⏳" color="yellow" />
        <StatCard title="Active Schedules" value={activeSchedules.toString()} icon="⏰" color="green" />
        <StatCard title="Documents Generated" value={docsGenerated.toString()} icon="📄" color="purple" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        {data.activity.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No recent activity</div>
        ) : (
          <ul className="space-y-2">
            {data.activity.slice(0,5).map((item, i) => (
              <li key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                <span className={`w-2 h-2 rounded-full ${item.type === 'success' ? 'bg-green-500' : item.type === 'deploy' ? 'bg-purple-500' : 'bg-blue-500'}`} />
                <span className="text-sm text-gray-900 font-medium">{item.event}</span>
                <span className="text-xs text-gray-500 ml-auto">{item.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h3 className="font-semibold text-blue-900">Mission Control Active</h3>
            <p className="text-sm text-blue-700 mt-1">
              Larrabee monitoring: {tasksToday} tasks today, {pendingApprovals} approvals pending. Auto-refresh every 30s.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: string; icon: string; color: 'blue' | 'yellow' | 'green' | 'purple' }) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    green: 'bg-green-50 border-green-200',
    purple: 'bg-purple-50 border-purple-200',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-lg p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
}
