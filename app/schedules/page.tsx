async function getData() {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/johnkhubbo/mission-control/main/state.json",
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return { schedules: [] };
  }
}

export default async function Schedules() {
  const data = await getData();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Schedules</h1>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
          Cron jobs and heartbeat configuration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Heartbeat Config</h2>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-xs sm:text-sm text-gray-600">Status</span>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-xs sm:text-sm text-gray-600">Interval</span>
              <span className="text-xs sm:text-sm font-medium text-gray-900">30 minutes</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs sm:text-sm text-gray-600">Last Beat</span>
              <span className="text-xs sm:text-sm font-medium text-gray-900">—</span>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
            <button className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100">
              Edit HEARTBEAT.md
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Active Schedules</h2>
          {data.schedules && data.schedules.length > 0 ? (
            <div className="space-y-2 sm:space-y-3">
              {data.schedules.map((schedule: any) => (
                <div key={schedule.id} className="py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{schedule.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{schedule.time}</p>
                    </div>
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded whitespace-nowrap">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-6 sm:py-8">
              <span className="text-2xl sm:text-3xl mb-2 block">⏰</span>
              <p className="text-xs sm:text-sm">No schedules configured</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Proactive Task Schedule</h2>
        <div className="space-y-2 sm:space-y-3">
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
    <div className="flex items-start sm:items-center justify-between gap-2 py-2 sm:py-3 px-3 sm:px-4 bg-gray-50 rounded-lg">
      <div className="flex items-start sm:items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <span className="text-base sm:text-lg flex-shrink-0">⏰</span>
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{task}</p>
          <p className="text-xs text-gray-500 mt-0.5">{time}</p>
        </div>
      </div>
      <span className={`px-2 py-0.5 sm:py-1 text-xs font-medium rounded whitespace-nowrap flex-shrink-0 ${statusColors[status]}`}>
        {status}
      </span>
    </div>
  );
}
