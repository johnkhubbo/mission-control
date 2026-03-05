export default function Documents() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
        <p className="mt-2 text-gray-600">
          Generated outputs and artifacts
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Documents</h2>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search documents..."
              className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              Sort
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <DocumentRow
            name="SOUL.md"
            type="System Config"
            date="2026-03-04"
            size="1.9 KB"
          />
          <DocumentRow
            name="USER.md"
            type="System Config"
            date="2026-03-04"
            size="3.5 KB"
          />
          <DocumentRow
            name="MEMORY.md"
            type="System Config"
            date="2026-03-04"
            size="2.0 KB"
          />
          <DocumentRow
            name="HEARTBEAT.md"
            type="System Config"
            date="2026-03-04"
            size="1.1 KB"
          />
          <DocumentRow
            name="TOOLS.md"
            type="System Config"
            date="2026-03-04"
            size="1.9 KB"
          />
          <DocumentRow
            name="FUTURE_UPGRADES.md"
            type="Planning"
            date="2026-03-04"
            size="4.7 KB"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-2xl mb-2">📋</div>
          <p className="text-sm font-medium text-blue-900">Reports</p>
          <p className="text-2xl font-bold text-blue-900 mt-1">0</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-2xl mb-2">📊</div>
          <p className="text-sm font-medium text-green-900">Analytics</p>
          <p className="text-2xl font-bold text-green-900 mt-1">0</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="text-2xl mb-2">🎨</div>
          <p className="text-sm font-medium text-purple-900">Content</p>
          <p className="text-2xl font-bold text-purple-900 mt-1">0</p>
        </div>
      </div>
    </div>
  );
}

function DocumentRow({
  name,
  type,
  date,
  size,
}: {
  name: string;
  type: string;
  date: string;
  size: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">📄</span>
        <div>
          <p className="text-sm font-medium text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{type}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-xs text-gray-500">
        <span>{date}</span>
        <span>{size}</span>
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          View →
        </button>
      </div>
    </div>
  );
}
