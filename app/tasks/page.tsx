export default function TasksLog() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tasks Log</h1>
        <p className="mt-2 text-gray-600">
          Everything Larrabee has done autonomously
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                Filter
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                Export
              </button>
            </div>
          </div>

          <div className="text-gray-500 text-center py-12">
            <span className="text-4xl mb-4 block">📋</span>
            <p className="text-lg font-medium">No tasks logged yet</p>
            <p className="text-sm mt-2">
              Autonomous tasks will appear here as they are completed
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">What Gets Logged?</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Proactive tasks (night + afternoon)</li>
          <li>• Funnel optimizations</li>
          <li>• Research and competitor monitoring</li>
          <li>• Memory file updates</li>
          <li>• Skill improvements</li>
        </ul>
      </div>
    </div>
  );
}
