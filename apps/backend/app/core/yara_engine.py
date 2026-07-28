import yara
import os


def yara_scan_file(file_path: str, rules_path: str = "yara_rules") -> dict:
    """
    Scan a file using all YARA rules in the rules_path directory.
    Returns a dictionary with matches.
    """

    if not os.path.exists(rules_path):
        return {"matches": [], "error": "rules_path_not_found"}

    # Load all .yar / .yara files
    rule_files = {}
    for filename in os.listdir(rules_path):
        if filename.endswith(".yar") or filename.endswith(".yara"):
            rule_files[filename] = os.path.join(rules_path, filename)

    if not rule_files:
        return {"matches": [], "error": "no_rules_found"}

    try:
        rules = yara.compile(filepaths=rule_files)
    except Exception as e:
        return {"matches": [], "error": f"compile_error: {e}"}

    try:
        matches = rules.match(file_path)
        return {"matches": [m.rule for m in matches]}
    except Exception as e:
        return {"matches": [], "error": f"scan_error: {e}"}
