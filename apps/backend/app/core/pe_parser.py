import pefile
import datetime


def parse_pe_file(file_path: str) -> dict | None:
    try:
        pe = pefile.PE(file_path)
    except Exception:
        return None

    result = {}

    # Timestamp
    try:
        ts = pe.FILE_HEADER.TimeDateStamp
        result["timestamp"] = str(datetime.datetime.utcfromtimestamp(ts))
    except:
        result["timestamp"] = None

    # Entry point
    try:
        result["entry_point"] = hex(pe.OPTIONAL_HEADER.AddressOfEntryPoint)
    except:
        result["entry_point"] = None

    # Subsystem
    try:
        result["subsystem"] = pefile.SUBSYSTEM_TYPE.get(
            pe.OPTIONIONAL_HEADER.Subsystem, "Unknown"
        )
    except:
        result["subsystem"] = None

    # Sections
    sections = []
    try:
        for s in pe.sections:
            sections.append({
                "name": s.Name.decode(errors="ignore").strip("\x00"),
                "virtual_size": hex(s.Misc_VirtualSize),
                "virtual_address": hex(s.VirtualAddress),
                "raw_size": hex(s.SizeOfRawData),
                "entropy": s.get_entropy(),
                "characteristics": hex(s.Characteristics),
            })
    except:
        pass
    result["sections"] = sections

    # Imports
    imports = []
    try:
        if hasattr(pe, "DIRECTORY_ENTRY_IMPORT"):
            for entry in pe.DIRECTORY_ENTRY_IMPORT:
                dll = entry.dll.decode(errors="ignore")
                funcs = []
                for imp in entry.imports:
                    funcs.append({
                        "name": imp.name.decode(errors="ignore") if imp.name else None,
                        "address": hex(imp.address),
                    })
                imports.append({"dll": dll, "functions": funcs})
    except:
        pass
    result["imports"] = imports

    # Signature
    result["has_signature"] = hasattr(pe, "DIRECTORY_ENTRY_SECURITY")

    return result
