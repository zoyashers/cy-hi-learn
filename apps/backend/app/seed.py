import asyncio
from sqlmodel import SQLModel
from app.core.db import engine, async_session
from app.models.case_models import Case
from app.models.evidence import Evidence
from app.models.task import Task


async def create_case_with_content(
    session,
    title: str,
    description: str,
    evidence_defs: list[dict],
    task_defs: list[dict],
):
    case = Case(title=title, description=description)
    session.add(case)
    await session.flush()  # ensure case.id is available

    evidence_items = [
        Evidence(
            case_id=case.id,
            filename=e["filename"],
            description=e["description"],
        )
        for e in evidence_defs
    ]

    tasks = [
        Task(
            case_id=case.id,
            title=t["title"],
            description=(
                f"Question: {t['question']}\n"
                f"Expected answer: {t['answer']}"
            ),
        )
        for t in task_defs
    ]

    session.add_all(evidence_items)
    session.add_all(tasks)


async def seed():
    # Create tables if they don't exist
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

    async with async_session() as session:
        # ==========================
        # BEGINNER CASES (1–5)
        # ==========================

        # Case 1 – Suspicious Login Investigation
        await create_case_with_content(
            session,
            title="Suspicious Login Investigation",
            description=(
                "A user account shows multiple failed logins followed by a "
                "successful login from an unusual IP."
            ),
            evidence_defs=[
                {
                    "filename": "auth.log",
                    "description": "Authentication log showing failed and successful logins.",
                },
                {
                    "filename": "network_capture.pcap",
                    "description": "Packet capture from the time of the incident.",
                },
            ],
            task_defs=[
                {
                    "title": "Identify the suspicious IP address",
                    "question": "Review the authentication logs and identify the suspicious IP address.",
                    "answer": "10.0.0.5",
                },
                {
                    "title": "Determine whether the login was successful",
                    "question": "Check if the attacker successfully logged in.",
                    "answer": "Yes",
                },
                {
                    "title": "Identify the timestamp of the suspicious login",
                    "question": "Find the exact time of the successful suspicious login.",
                    "answer": "2026-05-10 21:00:00",
                },
            ],
        )

        # Case 2 – Unauthorized USB Device
        await create_case_with_content(
            session,
            title="Unauthorized USB Device",
            description=(
                "A workstation shows signs of data access shortly after an unknown USB device was connected."
            ),
            evidence_defs=[
                {
                    "filename": "usb_events.log",
                    "description": "Log of USB insert/remove events on the workstation.",
                },
                {
                    "filename": "file_access.log",
                    "description": "Files accessed around the time of USB insertion.",
                },
            ],
            task_defs=[
                {
                    "title": "Identify the USB device",
                    "question": "Determine the vendor and product ID of the suspicious USB device.",
                    "answer": "VendorID: 0x1234, ProductID: 0x5678",
                },
                {
                    "title": "Identify the user",
                    "question": "Which user account was logged in when the USB device was inserted?",
                    "answer": "student01",
                },
                {
                    "title": "Identify accessed files",
                    "question": "List one sensitive file accessed after the USB insertion.",
                    "answer": "/home/student01/Documents/confidential_report.pdf",
                },
            ],
        )

        # Case 3 – Phishing Email Investigation
        await create_case_with_content(
            session,
            title="Phishing Email Investigation",
            description=(
                "A user reported a suspicious email that requested login credentials via a link."
            ),
            evidence_defs=[
                {
                    "filename": "email_headers.txt",
                    "description": "Raw email headers of the reported phishing email.",
                },
                {
                    "filename": "malicious_link.txt",
                    "description": "Extracted URL from the phishing email body.",
                },
            ],
            task_defs=[
                {
                    "title": "Identify spoofing indicators",
                    "question": "Review the email headers and identify one sign of sender spoofing.",
                    "answer": "Mismatch between From and Return-Path domains.",
                },
                {
                    "title": "Determine sending IP",
                    "question": "What is the real sending IP address from the headers?",
                    "answer": "203.0.113.45",
                },
                {
                    "title": "Extract phishing domain",
                    "question": "What domain is used in the phishing URL?",
                    "answer": "login-security.example-phish.com",
                },
            ],
        )

        # Case 4 – Suspicious Process Execution
        await create_case_with_content(
            session,
            title="Suspicious Process Execution",
            description=(
                "A host shows an unknown process consuming high CPU and network usage."
            ),
            evidence_defs=[
                {
                    "filename": "process_list.txt",
                    "description": "Snapshot of running processes on the host.",
                },
                {
                    "filename": "startup_items.log",
                    "description": "List of programs configured to start at boot.",
                },
            ],
            task_defs=[
                {
                    "title": "Identify suspicious process",
                    "question": "Which process appears suspicious based on name and path?",
                    "answer": "svchosts.exe in C:\\Users\\Public\\",
                },
                {
                    "title": "Check persistence",
                    "question": "Does the suspicious process have a persistence mechanism?",
                    "answer": "Yes, via a Run key in the registry.",
                },
                {
                    "title": "Identify parent process",
                    "question": "What is the parent process of the suspicious process?",
                    "answer": "explorer.exe",
                },
            ],
        )

        # Case 5 – Brute Force Attempt
        await create_case_with_content(
            session,
            title="Brute Force Login Attempt",
            description=(
                "The authentication system reports a spike in failed login attempts from a single IP."
            ),
            evidence_defs=[
                {
                    "filename": "auth.log",
                    "description": "Authentication log with multiple failed login attempts.",
                },
                {
                    "filename": "firewall.log",
                    "description": "Firewall log showing blocked IP addresses.",
                },
            ],
            task_defs=[
                {
                    "title": "Identify attacking IP",
                    "question": "Which IP address is responsible for the brute force attempts?",
                    "answer": "198.51.100.23",
                },
                {
                    "title": "Count failed attempts",
                    "question": "How many failed login attempts originated from the attacking IP?",
                    "answer": "50",
                },
                {
                    "title": "Determine success",
                    "question": "Did any login from this IP succeed?",
                    "answer": "No",
                },
            ],
        )

        # ==========================
        # INTERMEDIATE CASES (6–10)
        # ==========================

        # Case 6 – Privilege Escalation Attempt
        await create_case_with_content(
            session,
            title="Privilege Escalation Attempt",
            description=(
                "A standard user account appears to have attempted to gain administrative privileges."
            ),
            evidence_defs=[
                {
                    "filename": "sudo.log",
                    "description": "Log of sudo usage and failed attempts.",
                },
                {
                    "filename": "auth.log",
                    "description": "Authentication and user switching events.",
                },
                {
                    "filename": "bash_history.txt",
                    "description": "Command history for the suspected user.",
                },
            ],
            task_defs=[
                {
                    "title": "Identify the user",
                    "question": "Which user attempted to escalate privileges?",
                    "answer": "analyst01",
                },
                {
                    "title": "Determine method",
                    "question": "What method was used for privilege escalation?",
                    "answer": "sudo with a custom script.",
                },
                {
                    "title": "Post-escalation commands",
                    "question": "Name one suspicious command executed after escalation.",
                    "answer": "useradd backdoor -G sudo",
                },
            ],
        )

        # Case 7 – Lateral Movement via SMB
        await create_case_with_content(
            session,
            title="Lateral Movement via SMB",
            description=(
                "An attacker appears to have moved laterally between Windows hosts using SMB."
            ),
            evidence_defs=[
                {
                    "filename": "network_smb.pcap",
                    "description": "Packet capture of SMB traffic between hosts.",
                },
                {
                    "filename": "windows_event_4624.log",
                    "description": "Successful logon events.",
                },
                {
                    "filename": "windows_event_4625.log",
                    "description": "Failed logon events.",
                },
            ],
            task_defs=[
                {
                    "title": "Identify source host",
                    "question": "Which host initiated the lateral movement?",
                    "answer": "HOST-A",
                },
                {
                    "title": "Identify credentials used",
                    "question": "Which account credentials were used for lateral movement?",
                    "answer": "DOMAIN\\svc_backup",
                },
                {
                    "title": "Identify target host",
                    "question": "Which host was accessed via SMB?",
                    "answer": "HOST-B",
                },
            ],
        )

        # Case 8 – Web Server Compromise
        await create_case_with_content(
            session,
            title="Web Server Compromise",
            description=(
                "A public-facing web server shows signs of exploitation and possible webshell upload."
            ),
            evidence_defs=[
                {
                    "filename": "apache_access.log",
                    "description": "Web server access log with HTTP requests.",
                },
                {
                    "filename": "apache_error.log",
                    "description": "Web server error log.",
                },
                {
                    "filename": "webshell.php",
                    "description": "Recovered malicious PHP webshell file.",
                },
            ],
            task_defs=[
                {
                    "title": "Identify malicious request",
                    "question": "Which HTTP request likely uploaded the webshell?",
                    "answer": "POST /upload.php with filename=webshell.php",
                },
                {
                    "title": "Determine upload vector",
                    "question": "What functionality was abused to upload the webshell?",
                    "answer": "File upload form without proper validation.",
                },
                {
                    "title": "Confirm webshell execution",
                    "question": "Is there evidence that the webshell was executed?",
                    "answer": "Yes, requests to /uploads/webshell.php with cmd parameter.",
                },
            ],
        )

        # Case 9 – Persistence via Scheduled Task
        await create_case_with_content(
            session,
            title="Persistence via Scheduled Task",
            description=(
                "A Windows host appears to be running a suspicious program on a recurring schedule."
            ),
            evidence_defs=[
                {
                    "filename": "schtasks_export.xml",
                    "description": "Export of all scheduled tasks on the host.",
                },
                {
                    "filename": "registry_run_keys.reg",
                    "description": "Registry Run and RunOnce keys.",
                },
            ],
            task_defs=[
                {
                    "title": "Identify malicious task",
                    "question": "Which scheduled task appears malicious?",
                    "answer": "Task name: SystemUpdateHelper",
                },
                {
                    "title": "Determine frequency",
                    "question": "How often does the malicious task run?",
                    "answer": "Every 5 minutes.",
                },
                {
                    "title": "Identify payload path",
                    "question": "What is the executable path configured in the task?",
                    "answer": "C:\\ProgramData\\system\\update.exe",
                },
            ],
        )

        # Case 10 – Insider Data Exfiltration
        await create_case_with_content(
            session,
            title="Insider Data Exfiltration",
            description=(
                "A trusted employee is suspected of exfiltrating sensitive documents."
            ),
            evidence_defs=[
                {
                    "filename": "file_access.log",
                    "description": "Log of file access events for sensitive directories.",
                },
                {
                    "filename": "proxy.log",
                    "description": "Proxy log showing outbound connections and data volume.",
                },
                {
                    "filename": "usb_events.log",
                    "description": "USB insertion/removal events.",
                },
            ],
            task_defs=[
                {
                    "title": "Identify the user",
                    "question": "Which user accessed the sensitive files?",
                    "answer": "employee02",
                },
                {
                    "title": "Determine exfiltration method",
                    "question": "Was data exfiltrated via network or USB?",
                    "answer": "Network via large HTTPS upload.",
                },
                {
                    "title": "Identify accessed file",
                    "question": "Name one sensitive file that was accessed.",
                    "answer": "/srv/share/finance/Q4_results.xlsx",
                },
            ],
        )

        # ==========================
        # ADVANCED CASES (11–15)
        # ==========================

        # Case 11 – Ransomware Pre-Execution Indicators
        await create_case_with_content(
            session,
            title="Ransomware Pre-Execution Indicators",
            description=(
                "A host shows signs of ransomware staging activity before encryption begins."
            ),
            evidence_defs=[
                {
                    "filename": "process_tree.json",
                    "description": "Process tree showing parent-child relationships.",
                },
                {
                    "filename": "registry_changes.reg",
                    "description": "Registry changes related to backup and shadow copies.",
                },
                {
                    "filename": "network_traffic.pcap",
                    "description": "Network capture with possible C2 traffic.",
                },
            ],
            task_defs=[
                {
                    "title": "Identify precursor activity",
                    "question": "Which process chain suggests ransomware staging?",
                    "answer": "outlook.exe -> powershell.exe -> encryptor.exe",
                },
                {
                    "title": "Check shadow copy deletion",
                    "question": "Is there evidence of shadow copy deletion?",
                    "answer": "Yes, vssadmin delete shadows commands found.",
                },
                {
                    "title": "Identify C2 domain",
                    "question": "What C2 domain is contacted before encryption?",
                    "answer": "backup-sync.example-c2.com",
                },
            ],
        )

        # Case 12 – Malware Dropper Analysis
        await create_case_with_content(
            session,
            title="Malware Dropper Analysis",
            description=(
                "A suspicious executable is suspected of dropping additional payloads on the system."
            ),
            evidence_defs=[
                {
                    "filename": "dropper.exe",
                    "description": "Suspicious executable recovered from the host.",
                },
                {
                    "filename": "process_monitor.log",
                    "description": "Log of file and registry activity during dropper execution.",
                },
                {
                    "filename": "network_capture.pcap",
                    "description": "Network capture during dropper execution.",
                },
            ],
            task_defs=[
                {
                    "title": "Identify dropped payload",
                    "question": "Which file is created by the dropper as the main payload?",
                    "answer": "C:\\Users\\Public\\svchosts.exe",
                },
                {
                    "title": "Determine persistence mechanism",
                    "question": "How does the payload achieve persistence?",
                    "answer": "Registry Run key: HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\svchosts",
                },
                {
                    "title": "Identify network indicator",
                    "question": "What is one C2 IP or domain contacted by the dropper?",
                    "answer": "203.0.113.200",
                },
            ],
        )

        # Case 13 – Cloud IAM Compromise (AWS)
        await create_case_with_content(
            session,
            title="Cloud IAM Compromise (AWS)",
            description=(
                "An AWS IAM user appears to have been compromised and used for malicious activity."
            ),
            evidence_defs=[
                {
                    "filename": "cloudtrail.json",
                    "description": "CloudTrail logs of recent IAM and EC2 activity.",
                },
                {
                    "filename": "iam_policy_changes.json",
                    "description": "Record of recent IAM policy modifications.",
                },
                {
                    "filename": "ec2_activity.json",
                    "description": "Log of EC2 instance creation and modification.",
                },
            ],
            task_defs=[
                {
                    "title": "Identify compromised user",
                    "question": "Which IAM user account was likely compromised?",
                    "answer": "prod-deploy-user",
                },
                {
                    "title": "Determine privilege escalation path",
                    "question": "How were additional permissions obtained?",
                    "answer": "Inline policy attached granting AdministratorAccess.",
                },
                {
                    "title": "Identify malicious EC2 activity",
                    "question": "What suspicious EC2 action was performed?",
                    "answer": "Creation of an EC2 instance in an unapproved region.",
                },
            ],
        )

        # Case 14 – Supply Chain Attack (Package Tampering)
        await create_case_with_content(
            session,
            title="Supply Chain Attack via Package Tampering",
            description=(
                "A software package in the build pipeline appears to have been tampered with."
            ),
            evidence_defs=[
                {
                    "filename": "package_hashes.txt",
                    "description": "Recorded hashes of expected vs. actual package files.",
                },
                {
                    "filename": "build_logs.txt",
                    "description": "Build pipeline logs for the affected release.",
                },
                {
                    "filename": "dependency_tree.json",
                    "description": "Dependency tree of the application.",
                },
            ],
            task_defs=[
                {
                    "title": "Identify tampered package",
                    "question": "Which package shows a hash mismatch?",
                    "answer": "libauth-1.2.3.tgz",
                },
                {
                    "title": "Determine tampering time",
                    "question": "At what stage in the pipeline did tampering likely occur?",
                    "answer": "During artifact storage before deployment.",
                },
                {
                    "title": "Identify malicious dependency",
                    "question": "Which unexpected dependency was introduced?",
                    "answer": "libauth-helper-malicious",
                },
            ],
        )

        # Case 15 – APT Multi-Stage Intrusion
        await create_case_with_content(
            session,
            title="APT Multi-Stage Intrusion",
            description=(
                "An advanced persistent threat (APT) actor appears to have conducted a multi-stage intrusion."
            ),
            evidence_defs=[
                {
                    "filename": "phishing_email.eml",
                    "description": "Original phishing email used for initial access.",
                },
                {
                    "filename": "c2_traffic.pcap",
                    "description": "Network capture showing beaconing to C2.",
                },
                {
                    "filename": "powershell_logs.evtx",
                    "description": "PowerShell operational logs from compromised hosts.",
                },
                {
                    "filename": "exfiltration.log",
                    "description": "Log of data staging and exfiltration events.",
                },
            ],
            task_defs=[
                {
                    "title": "Identify initial access vector",
                    "question": "What method did the attacker use for initial access?",
                    "answer": "Phishing email with malicious attachment.",
                },
                {
                    "title": "Map intrusion stages",
                    "question": "List the main stages of the intrusion (at least three).",
                    "answer": "Initial access, lateral movement, data exfiltration.",
                },
                {
                    "title": "Identify exfiltration method",
                    "question": "How was data exfiltrated from the environment?",
                    "answer": "HTTPS uploads to attacker-controlled server.",
                },
                {
                    "title": "Identify compromised hosts",
                    "question": "Name one host confirmed to be compromised.",
                    "answer": "CORP-FILE-01",
                },
            ],
        )

        # Commit all cases, evidence, and tasks
        await session.commit()

    print("Database seeded successfully!")


if __name__ == "__main__":
    asyncio.run(seed())
