# How Larrabee Updates Mission Control State

This file documents how I (Larrabee) maintain the Mission Control dashboard state.

## State File Location

**Primary:** `/home/node/.openclaw/workspace/mission-control-state.json`  
**Dashboard reads from:** `mission-control/state.json` (synced via git)

## Update Process

When I complete work, I:

1. **Update local state:**
   ```bash
   # Read current state
   jq . mission-control-state.json
   
   # Update (example: add task completion)
   jq '.activity += [{time: "'$(date -u +"%H:%M UTC")'", event: "Task completed: X", type: "success"}]' \
      mission-control-state.json > tmp.json && mv tmp.json mission-control-state.json
   
   # Update metadata
   jq '._meta.lastUpdated = "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"' \
      mission-control-state.json > tmp.json && mv tmp.json mission-control-state.json
   ```

2. **Sync to dashboard repo:**
   ```bash
   cd mission-control/
   cp ../mission-control-state.json state.json
   git add state.json
   git commit -m "Update state: [what changed]"
   git push origin main
   ```

3. **Dashboard auto-refreshes** within 30 seconds

## State Schema

```json
{
  "tasks": [
    {
      "id": "task-xxx",
      "title": "Task name",
      "status": "pending|in-progress|completed",
      "due": "YYYY-MM-DD",
      "agent": "Larrabee"
    }
  ],
  "approvals": [
    {
      "id": "approval-xxx",
      "title": "What needs approval",
      "status": "pending|approved|rejected",
      "requested": "ISO8601 timestamp"
    }
  ],
  "schedules": [
    {
      "id": "sched-xxx",
      "title": "Schedule name",
      "time": "Human-readable time",
      "next": "ISO8601 timestamp of next run"
    }
  ],
  "documents": [
    {
      "id": "doc-xxx",
      "title": "Document filename",
      "generated": "ISO8601 timestamp"
    }
  ],
  "activity": [
    {
      "time": "HH:MM UTC",
      "event": "What happened",
      "type": "success|update|deploy|error"
    }
  ],
  "_meta": {
    "lastUpdated": "ISO8601 timestamp",
    "version": "semver"
  }
}
```

## When to Update

**Tasks:**
- When I start new autonomous work
- When I complete tasks
- When tasks are blocked

**Approvals:**
- When I need John's approval for something (>$0.50 spend, public posts, etc.)
- When approval is granted/rejected

**Schedules:**
- When cron jobs are set up
- When scheduled work completes

**Documents:**
- When I generate reports, briefs, or significant files

**Activity:**
- Every significant action (keep last 20 entries)

## Helper Functions (TODO)

Create `~/workspace/scripts/update-mission-control.sh` wrapper for common updates.

---

**Note:** This is the source of truth for Mission Control. No external databases needed.
