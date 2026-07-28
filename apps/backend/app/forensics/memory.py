import subprocess

def run_volatility(path: str):
    cmd = ["vol", "-f", path, "windows.pslist"]
    output = subprocess.check_output(cmd).decode()
    return {"pslist": output}
