def score_findings(answer_key: str, user_findings: str):
    """
    Simple scoring engine:
    - Compare keywords in answer_key vs findings
    - Score 0–100
    """

    key_words = [w.lower() for w in answer_key.split()]
    user_words = [w.lower() for w in user_findings.split()]

    matches = sum(1 for w in key_words if w in user_words)
    score = int((matches / len(key_words)) * 100)

    feedback = f"Matched {matches}/{len(key_words)} key concepts."

    return score, feedback
