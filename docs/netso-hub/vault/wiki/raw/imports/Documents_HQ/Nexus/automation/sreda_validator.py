import json

# SREDA Equipment Validator: 2026 Edition
# Only crystalline modules are approved for Phase 2 net metering in Bangladesh.
# Reference: NETSO Strategic Report Part 1 (SREDA Framework)

APPROVED_EQUIPMENT = {
    "modules": [
        {"manufacturer": "Jinko Solar", "model": "Tiger Neo", "p_range": "720-780Wp"},
        {"manufacturer": "Longi Solar", "model": "Hi-MO 6", "p_range": "600-700Wp"},
        {"manufacturer": "Trina Solar", "model": "Vertex", "p_range": "600-750Wp"},
        {"manufacturer": "Canadian Solar", "model": "HiHero", "p_range": "600-700Wp"},
        {"manufacturer": "JA Solar", "model": "DeepBlue 4.0", "p_range": "600-700Wp"}
    ],
    "inverters": [
        {"manufacturer": "Sungrow", "models": ["SG5KTL", "SG50CX", "SG110CX"]},
        {"manufacturer": "Huawei", "models": ["SUN2000-50KTL", "SUN2000-100KTL"]},
        {"manufacturer": "Solis", "models": ["S5-GC-50K", "S5-GC-100K"]},
        {"manufacturer": "Growatt", "models": ["MAX 50KTL3", "MAX 100KTL3"]}
    ]
}

def validate_system(module_make, module_model, inverter_make, inverter_model):
    is_module_ok = False
    is_inverter_ok = False
    
    # Simple check for demo/initial validation
    for m in APPROVED_EQUIPMENT['modules']:
        if module_make.lower() in m['manufacturer'].lower() and module_model.lower() in m['model'].lower():
            is_module_ok = True
            break
            
    for i in APPROVED_EQUIPMENT['inverters']:
        if inverter_make.lower() in i['manufacturer'].lower() and any(inv_m.lower() in inverter_model.lower() for inv_m in i['models']):
            is_inverter_ok = True
            break
            
    return {
        "valid": is_module_ok and is_inverter_ok,
        "module_status": "APPROVED" if is_module_ok else "REJECTED (Non-Crystalline or Unlisted)",
        "inverter_status": "APPROVED" if is_inverter_ok else "REJECTED (Must be certified model)",
        "actions": [] if (is_module_ok and is_inverter_ok) else ["Consult SREDA/BSTI list for 171 approved models"]
    }

if __name__ == "__main__":
    # Test valid configuration
    res = validate_system("Jinko", "Tiger Neo", "Sungrow", "SG110CX")
    print(f"Validation Result: {json.dumps(res, indent=2)}")
