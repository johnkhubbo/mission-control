# Mission Control - Real-Time Setup

## Architecture

**Data Flow:**
```
Larrabee working → Updates mission-control-state.json → Syncs to GitHub → Dashboard reads state.json → Auto-refresh every 30s
```

**No external dependencies.** State file lives in workspace, synced via git.

## ✅ Completed

- ✅ Created local state file (`mission-control-state.json`)
- ✅ API route reads from GitHub raw URL (no caching)
- ✅ Dashboard auto-refreshes every 30 seconds
- ✅ Manual refresh button + last-updated timestamp
- ✅ Committed and pushed to GitHub
- ✅ Vercel deployment triggered automatically

## 🎯 How It Works

1. **Larrabee maintains state** in `/workspace/mission-control-state.json`:
   - Tasks I'm working on
   - Approvals I need from John
   - Scheduled jobs I'm running
   - Documents I've generated
   - Recent activity log

2. **State syncs to dashboard repo:**
   ```bash
   cp mission-control-state.json mission-control/state.json
   cd mission-control && git add state.json && git commit -m "Update state" && git push
   ```

3. **Dashboard API** (`/api/data`) fetches from:
   ```
   https://raw.githubusercontent.com/johnkhubbo/mission-control/main/state.json
   ```

4. **Frontend polls API** every 30s for real-time updates

5. **Fallback:** Static demo data if GitHub fetch fails

## 📊 State File Structure

See `UPDATE_STATE.md` for full schema and update procedures.

## 🧪 Testing

1. Visit https://mission-control-nine-sooty.vercel.app/
2. Check "Last updated" timestamp
3. Verify source shows "github-state"
4. Manual refresh button should fetch latest state

## 🚀 Next Steps

- [ ] Create helper script (`scripts/update-mission-control.sh`) for easy state updates
- [ ] Add state update calls to heartbeat routine
- [ ] Implement approval workflow (create approval → update state → John approves → update state)
- [ ] Add task tracking for autonomous work sessions

---

**Status:** Fully operational. No external services required. State maintained by Larrabee in workspace.
