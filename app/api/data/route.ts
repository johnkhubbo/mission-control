import { NextResponse } from 'next/server';

interface MissionControlState {
  tasks: Array<{id: string, title: string, status: string, due: string, agent: string}>;
  approvals: Array<{id: string, title: string, status: string, requested: string}>;
  schedules: Array<{id: string, title: string, time: string, next: string}>;
  documents: Array<{id: string, title: string, generated: string}>;
  activity: Array<{time: string, event: string, type: string}>;
  _meta?: {
    lastUpdated: string;
    version: string;
  };
}

const STATE_URL = process.env.MISSION_CONTROL_STATE_URL || 
  'https://raw.githubusercontent.com/johnkhubbo/mission-control/main/state.json';

async function fetchState(): Promise<MissionControlState> {
  try {
    const response = await fetch(STATE_URL, {
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache' },
    });

    if (!response.ok) {
      console.error('Failed to fetch state:', response.status);
      return getFallbackState();
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching state:', error);
    return getFallbackState();
  }
}

function getFallbackState(): MissionControlState {
  return {
    tasks: [
      {
        id: "task-001",
        title: "Mission Control Setup",
        status: "completed",
        due: new Date().toISOString().split('T')[0],
        agent: "Larrabee"
      }
    ],
    approvals: [],
    schedules: [
      {
        id: "sched-001",
        title: "Heartbeat Check",
        time: "Every 30 minutes",
        next: new Date().toISOString()
      }
    ],
    documents: [
      {
        id: "doc-001",
        title: "Mission Control Setup Complete",
        generated: new Date().toISOString()
      }
    ],
    activity: [
      {
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }) + ' UTC',
        event: "Mission Control initialized",
        type: "success"
      }
    ],
    _meta: {
      lastUpdated: new Date().toISOString(),
      version: "0.2.0"
    }
  };
}

export async function GET() {
  const state = await fetchState();

  return NextResponse.json({
    ...state,
    _meta: {
      ...state._meta,
      fetchedAt: new Date().toISOString(),
      source: 'github-state',
    },
  });
}
