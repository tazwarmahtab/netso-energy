# Netso Google Drive Structure & Upload Guide

## 📁 Complete Folder Hierarchy

```
NETSO/
├── 01_LEGAL_AND_COMPLIANCE/
│   ├── EPC_Contracts/Templates/
│   ├── RESCO_Registration/
│   ├── Regulatory_Compliance/
│   └── Insurance/
├── 02_TECHNICAL/
│   ├── System_Design/
│   ├── Engineering/
│   ├── Certifications/
│   └── Standards/
├── 03_CUSTOMER/
│   ├── Pilot_Program/
│   ├── Proposals/
│   └── Customer_Communications/
├── 04_FINANCIAL/
│   ├── Financial_Models/
│   ├── Invoices/
│   ├── Budget/
│   └── Funding/
├── 05_MARKETING/
│   ├── Brand_Assets/
│   ├── Sales_Materials/
│   ├── Website/
│   └── Social_Media/
├── 06_PILOT_PROGRAM/
│   ├── Data_Tracking/
│   ├── Inspections/
│   ├── Installation/
│   └── Monitoring/
├── 07_OPERATIONS/
│   ├── SOPs/
│   ├── Supplier_Database/
│   ├── Subcontractor_Agreements/
│   └── Training_Materials/
└── 08_STRATEGIC/
    ├── Strategic_Reports/
    ├── Investor_Relations/
    ├── Roadmap/
    └── Competitive_Intelligence/
```

## 🔐 Access Permissions Matrix

| Folder | Founder | Legal | Technical | Sales | Operations | Investors |
|--------|---------|-------|-----------|-------|------------|-----------|
| 01_LEGAL | Full | Full | View | None | View | None |
| 02_TECHNICAL | Full | View | Full | View | Full | None |
| 03_CUSTOMER | Full | View | View | Full | Full | None |
| 04_FINANCIAL | Full | View | None | None | View | Limited |
| 05_MARKETING | Full | None | None | Full | View | None |
| 06_PILOT | Full | View | Full | View | Full | View |
| 07_OPERATIONS | Full | View | Full | None | Full | None |
| 08_STRATEGIC | Full | View | View | View | View | Limited |

## 📤 Google Drive Setup Instructions

### Step 1: Create Main Folder Structure
1. Go to https://drive.google.com
2. Click "New" → "Folder"
3. Name it "NETSO"
4. Inside NETSO, create 8 folders:
   - 01_LEGAL_AND_COMPLIANCE
   - 02_TECHNICAL
   - 03_CUSTOMER
   - 04_FINANCIAL
   - 05_MARKETING
   - 06_PILOT_PROGRAM
   - 07_OPERATIONS
   - 08_STRATEGIC

### Step 2: Create Subfolders
For each main folder, create the subfolders listed in the hierarchy above.

### Step 3: Set Permissions
1. Right-click folder → "Share"
2. Add team member emails
3. Set permission level (Viewer/Editor/Owner)
4. Check "Notify people"

### Step 4: Upload Initial Documents
Upload these files immediately:
- All strategic reports → 08_STRATEGIC/Strategic_Reports/
- This guide → 01_LEGAL_AND_COMPLIANCE/
- EPC templates (once created) → 01_LEGAL_AND_COMPLIANCE/EPC_Contracts/Templates/

## 📊 Upload Script (Python)

**Prerequisites:**
```bash
pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib
```

**Setup:**
1. Go to https://console.cloud.google.com/
2. Create new project "Netso Drive Integration"
3. Enable Google Drive API
4. Create OAuth 2.0 credentials (Desktop app)
5. Download credentials.json

**Script:**
```python
#!/usr/bin/env python3
"""
Netso Google Drive Bulk Upload Script
Uploads files to organized folder structure
"""

import os
import sys
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaFileUpload

SCOPES = ['https://www.googleapis.com/auth/drive']

# Folder structure mapping
FOLDER_STRUCTURE = {
    '01_LEGAL_AND_COMPLIANCE': ['EPC_Contracts', 'EPC_Contracts/Templates', 'RESCO_Registration', 
                                 'Regulatory_Compliance', 'Regulatory_Compliance/SREDA_Guidelines',
                                 'Regulatory_Compliance/BERC_Grid_Code', 'Insurance'],
    '02_TECHNICAL': ['System_Design', 'System_Design/Design_Templates', 'Engineering', 
                     'Certifications', 'Certifications/Module_Certifications', 'Standards'],
    '03_CUSTOMER': ['Pilot_Program', 'Pilot_Program/Customer_Agreements', 'Proposals', 
                    'Customer_Communications', 'Customer_Communications/FAQs'],
    '04_FINANCIAL': ['Financial_Models', 'Invoices', 'Budget', 'Funding', 'Funding/Investor_Decks'],
    '05_MARKETING': ['Brand_Assets', 'Brand_Assets/Logos', 'Sales_Materials', 'Website', 'Social_Media'],
    '06_PILOT_PROGRAM': ['Data_Tracking', 'Inspections', 'Installation', 'Monitoring'],
    '07_OPERATIONS': ['SOPs', 'Supplier_Database', 'Subcontractor_Agreements', 'Training_Materials'],
    '08_STRATEGIC': ['Strategic_Reports', 'Investor_Relations', 'Roadmap', 'Competitive_Intelligence']
}

def authenticate():
    """Authenticate and return Drive service"""
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file('credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    
    return build('drive', 'v3', credentials=creds)

def create_folder(service, folder_name, parent_id=None):
    """Create a folder in Google Drive"""
    file_metadata = {
        'name': folder_name,
        'mimeType': 'application/vnd.google-apps.folder'
    }
    if parent_id:
        file_metadata['parents'] = [parent_id]
    
    folder = service.files().create(body=file_metadata, fields='id').execute()
    return folder.get('id')

def find_folder(service, folder_name, parent_id=None):
    """Find folder by name"""
    query = f"name='{folder_name}' and mimeType='application/vnd.google-apps.folder'"
    if parent_id:
        query = f"name='{folder_name}' and mimeType='application/vnd.google-apps.folder' and '{parent_id}' in parents"
    
    results = service.files().list(q=query, fields="files(id, name)").execute()
    items = results.get('files', [])
    
    if items:
        return items[0]['id']
    return None

def upload_file(service, file_path, parent_id=None):
    """Upload a file to Google Drive"""
    file_name = os.path.basename(file_path)
    file_metadata = {'name': file_name}
    if parent_id:
        file_metadata['parents'] = [parent_id]
    
    media = MediaFileUpload(file_path, resumable=True)
    file = service.files().create(body=file_metadata, media_body=media, fields='id, webViewLink').execute()
    print(f"✓ Uploaded: {file_name} → {file.get('webViewLink')}")
    return file.get('id')

def setup_folder_structure(service, base_folder_id):
    """Create the complete Netso folder structure"""
    print("\n📁 Setting up Netso folder structure...")
    
    for main_folder, subfolders in FOLDER_STRUCTURE.items():
        # Create main folder
        main_id = find_folder(service, main_folder, base_folder_id)
        if not main_id:
            main_id = create_folder(service, main_folder, base_folder_id)
            print(f"  Created: {main_folder}")
        else:
            print(f"  Found: {main_folder}")
        
        # Create subfolders
        for subfolder in subfolders:
            sub_name = subfolder.split('/')[-1]
            parent_path = '/'.join(subfolder.split('/')[:-1]) if '/' in subfolder else ''
            
            # Find parent folder
            if parent_path:
                parent_id_temp = find_folder(service, parent_path, base_folder_id)
            else:
                parent_id_temp = main_id
            
            # Create subfolder
            sub_id = find_folder(service, sub_name, parent_id_temp if parent_id_temp else main_id)
            if not sub_id:
                sub_id = create_folder(service, sub_name, parent_id_temp if parent_id_temp else main_id)
                print(f"    Created: {sub_name}")

def main():
    """Main execution"""
    print("🚀 Netso Drive Upload Script")
    print("=" * 50)
    
    # Authenticate
    service = authenticate()
    
    # Find or create NETSO base folder
    netso_id = find_folder(service, 'NETSO')
    if not netso_id:
        netso_id = create_folder(service, 'NETSO')
        print(f"\n✓ Created NETSO base folder")
    else:
        print(f"\n✓ Found NETSO base folder")
    
    # Setup folder structure
    setup_folder_structure(service, netso_id)
    
    print("\n✅ Folder structure setup complete!")
    print("\nNext steps:")
    print("1. Upload strategic documents to 08_STRATEGIC/Strategic_Reports/")
    print("2. Share folders with team members")
    print("3. Install Google Drive for Desktop")

if __name__ == '__main__':
    main()
```

## ✅ Implementation Checklist

- [ ] Create Google Cloud project
- [ ] Enable Google Drive API
- [ ] Download credentials.json
- [ ] Run setup script to create folder structure
- [ ] Verify all folders created
- [ ] Share folders with team
- [ ] Upload initial documents
- [ ] Install Google Drive for Desktop on all devices
- [ ] Test file synchronization

---

**Created:** 2026-03-16  
**Owner:** Tazwar Mahtab  
**Status:** Ready for implementation
