export default function Approvals() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Approvals Queue</h1>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
          Drafts staged for sign-off
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-3 gap-3 sm:gap-4">
        <StatCard title="Pending" count={0} color="yellow" />
        <StatCard title="Approved" count={0} color="green" />
        <StatCard title="Rejected" count={0} color="red" />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 sm:mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Pending Approvals</h2>
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
            <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded-md hover:bg-gray-50 whitespace-nowrap">
              All
            </button>
            <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-gray-900 whitespace-nowrap">
              Content
            </button>
            <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-gray-900 whitespace-nowrap">
              Infra
            </button>
            <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-gray-900 whitespace-nowrap">
              Spend
            </button>
          </div>
        </div>

        <div className="text-gray-500 text-center py-8 sm:py-12">
          <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">✅</span>
          <p className="text-base sm:text-lg font-medium">No pending approvals</p>
          <p className="text-xs sm:text-sm mt-2">
            Items requiring your sign-off will appear here
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <span className="text-xl sm:text-2xl flex-shrink-0">⚠️</span>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-yellow-900">Approval Rules</h3>
            <ul className="text-xs sm:text-sm text-yellow-700 mt-2 space-y-1">
              <li>• Public content (posts, emails, DMs)</li>
              <li>• Paid usage &gt;$0.50 per task</li>
              <li>• Permissions expansion (read → write)</li>
              <li>• Public infrastructure (URLs, webhooks)</li>
              <li>• External communication on your behalf</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  count, 
  color 
}: { 
  title: string; 
  count: number; 
  color: 'yellow' | 'green' | 'red';
}) {
  const colorClasses = {
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    green: 'bg-green-50 border-green-200 text-green-900',
    red: 'bg-red-50 border-red-200 text-red-900',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-lg p-3 sm:p-4`}>
      <p className="text-xs sm:text-sm font-medium opacity-80">{title}</p>
      <p className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">{count}</p>
    </div>
  );
}
