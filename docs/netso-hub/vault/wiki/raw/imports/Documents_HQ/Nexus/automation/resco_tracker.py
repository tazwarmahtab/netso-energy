import datetime
import json
import os

# RESCO Automation Engine: 8-Month BPDB Clock Tracker
# 2026 Mandate: SREDA approvals expire exactly 8 months from issuance.
# This script monitors site progress and triggers alerts for Taz at critical thresholds.

SITES_DB = "resco_sites.json"

def load_sites():
    if os.path.exists(SITES_DB):
        with open(SITES_DB, 'r') as f:
            return json.load(f)
    return []

def save_sites(sites):
    with open(SITES_DB, 'w') as f:
        json.dump(sites, f, indent=4)

def check_deadlines():
    sites = load_sites()
    today = datetime.date.today()
    
    for site in sites:
        if site.get('sreda_approval_date'):
            approval_date = datetime.datetime.strptime(site['sreda_approval_date'], "%Y-%m-%d").date()
            deadline = approval_date + datetime.timedelta(days=8 * 30) # Approx 8 months
            days_remaining = (deadline - today).days
            
            print(f"Site: {site['name']}")
            print(f"  Approval Date: {approval_date}")
            print(f"  Deadline: {deadline}")
            print(f"  Days Remaining: {days_remaining}")
            
            if days_remaining <= 14:
                print("  STATUS: [CRITICAL] ⚠️ Less than 2 weeks to BPDB execution deadline!")
            elif days_remaining <= 60:
                print("  STATUS: [WARNING] 🕒 Less than 2 months remaining. Initiate final procurement.")
            else:
                print("  STATUS: [OK] Pipeline active.")
    
if __name__ == "__main__":
    # Example Site for Initialization
    example_sites = [
        {
            "name": "Chattogram Pilot (3kW)",
            "sreda_approval_date": "2026-03-01",
            "capacity_kwp": 3.0,
            "phase": "Single",
            "bpdb_status": "Approved"
        }
    ]
    if not os.path.exists(SITES_DB):
        save_sites(example_sites)
        
    check_deadlines()
