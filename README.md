# Mission Control

Central dashboard for autonomous AI agent monitoring and approvals.

**Live Dashboard:** https://mission-control-nine-sooty.vercel.app/

## Architecture

Real-time dashboard powered by local state file (no external databases).

- **State maintained by:** Larrabee (AI agent) in workspace
- **Data source:** GitHub raw URL (synced via git)
- **Updates:** Auto-refresh every 30 seconds
- **Deployment:** Vercel (auto-deploy on push)

## Documentation

- **SETUP.md** - Architecture and deployment details
- **UPDATE_STATE.md** - How Larrabee maintains the state file

## Repository

https://github.com/johnkhubbo/mission-control
