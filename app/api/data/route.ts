import { NextResponse } from 'next/server';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appTODO'; // John to provide
const TASKS_TABLE = process.env.AIRTABLE_TASKS_TABLE || 'Tasks';
const APPROVALS_TABLE = process.env.AIRTABLE_APPROVALS_TABLE || 'Approvals';
const SCHEDULES_TABLE = process.env.AIRTABLE_SCHEDULES_TABLE || 'Schedules';

interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
  createdTime: string;
}

interface AirtableResponse {
  records: AirtableRecord[];
}

async function fetchAirtableTable(tableName: string): Promise<AirtableRecord[]> {
  if (!AIRTABLE_API_KEY) {
    console.warn('No Airtable API key configured');
    return [];
  }

  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 }, // Disable caching for real-time data
    });

    if (!response.ok) {
      console.error(`Airtable API error (${tableName}):`, response.status, await response.text());
      return [];
    }

    const data: AirtableResponse = await response.json();
    return data.records || [];
  } catch (error) {
    console.error(`Error fetching Airtable table ${tableName}:`, error);
    return [];
  }
}

function mapTaskRecord(record: AirtableRecord): any {
  return {
    id: record.id,
    title: record.fields.Title || record.fields.Name || 'Untitled',
    status: record.fields.Status || 'unknown',
    due: record.fields.DueDate || record.fields.Due || new Date().toISOString().split('T')[0],
    agent: record.fields.Agent || record.fields.AssignedTo || 'Larrabee',
  };
}

function mapApprovalRecord(record: AirtableRecord): any {
  return {
    id: record.id,
    title: record.fields.Title || record.fields.Name || 'Untitled',
    status: record.fields.Status || 'pending',
    requested: record.fields.Requested || record.createdTime,
  };
}

function mapScheduleRecord(record: AirtableRecord): any {
  return {
    id: record.id,
    title: record.fields.Title || record.fields.Name || 'Untitled',
    time: record.fields.Time || record.fields.Schedule || 'Unknown',
    next: record.fields.NextRun || record.fields.Next || new Date().toISOString().split('T')[0],
  };
}

export async function GET() {
  try {
    // Fetch all tables in parallel
    const [tasksRecords, approvalsRecords, schedulesRecords] = await Promise.all([
      fetchAirtableTable(TASKS_TABLE),
      fetchAirtableTable(APPROVALS_TABLE),
      fetchAirtableTable(SCHEDULES_TABLE),
    ]);

    // Map records to dashboard format
    const tasks = tasksRecords.map(mapTaskRecord);
    const approvals = approvalsRecords.map(mapApprovalRecord);
    const schedules = schedulesRecords.map(mapScheduleRecord);

    // Generate activity log from recent records (last 10)
    const activity = [
      ...tasksRecords.slice(0, 5).map(r => ({
        time: new Date(r.createdTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) + ' UTC',
        event: `Task created: ${r.fields.Title || 'Untitled'}`,
        type: 'success',
      })),
      ...approvalsRecords.slice(0, 3).map(r => ({
        time: new Date(r.createdTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) + ' UTC',
        event: `Approval requested: ${r.fields.Title || 'Untitled'}`,
        type: 'update',
      })),
    ].sort((a, b) => b.time.localeCompare(a.time));

    // Mock documents for now (can be added to Airtable later)
    const documents = [
      { id: 1, title: 'AI-Brief-' + new Date().toISOString().split('T')[0] + '.md', generated: new Date().toISOString() },
    ];

    return NextResponse.json({
      tasks,
      approvals,
      schedules,
      documents,
      activity,
      _meta: {
        fetchedAt: new Date().toISOString(),
        source: 'airtable',
      },
    });
  } catch (error) {
    console.error('Error in /api/data:', error);
    
    // Fallback to static data on error
    const fallbackData = await import('../../data.json');
    return NextResponse.json({
      ...fallbackData.default,
      _meta: {
        fetchedAt: new Date().toISOString(),
        source: 'fallback',
        error: String(error),
      },
    });
  }
}
