import google.generativeai as genai
from app.core.config import SECRET_KEY

genai.configure(api_key=SECRET_KEY)

async def generate_case_report(case, evidence, timeline, findings, score):
    prompt = f"""
    Generate a professional SOC incident report.

    Case Title: {case.title}
    Description: {case.description}

    Evidence:
    {evidence}

    Timeline:
    {timeline}

    Findings:
    {findings}

    Score: {score.score if score else 'N/A'}

    Format as:
    - Executive Summary
    - Key Evidence
    - Timeline Overview
    - Analyst Findings
    - Recommendations
    """

    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(prompt)

    return response.text
