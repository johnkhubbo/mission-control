export default function Schedules() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Schedules</h1>
        <p className="mt-2 text-gray-600">
          Cron jobs and heartbeat configuration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Heartbeat Config</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Status</span>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Interval</span>
              <span className="text-sm font-medium text-gray-900">30 minutes</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Last Beat</span>
              <span className="text-sm font-medium text-gray-900">—</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button className="w-full px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100">
              Edit HEARTBEAT.md
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Cron Jobs</h2>
          <div className="text-gray-500 text-center py-8">
            <span className="text-3xl mb-2 block">⏰</span>
            <p className="text-sm">No cron jobs configured</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Proactive Task Schedule</h2>
        <div className="space-y-3">
          <ScheduleRow
            time="~2:00 PM Melbourne"
            task="Afternoon proactive task"
            status="pending"
          />
          <ScheduleRow
            time="~11:00 PM Melbourne"
            task="Night proactive task"
            status="pending"
          />
          <ScheduleRow
            time="~8:00 AM Melbourne"
            task="Daily briefing"
            status="pending"
          />
        </div>
      </div>
    </div>
  );
}

function ScheduleRow({ 
  time, 
  task, 
  status 
}: { 
  time: string; 
  task: string; 
  status: 'active' | 'pending' | 'completed';
}) {
  const statusColors = {
    active: 'bg-blue-100 text-blue-800',
    pending: 'bg-gray-100 text-gray-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <span className="text-lg">⏰</span>
        <div>
          <p className="text-sm font-medium text-gray-900">{task}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
      <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[status]}`}>
        {status}
      </span>
    </div>
  );
}
