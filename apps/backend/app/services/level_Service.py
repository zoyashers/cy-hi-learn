def get_level_from_xp(xp: int):
    """
    Level curve:
    Level 1 = 0 XP
    Level 2 = 100 XP
    Level 3 = 250 XP
    Level 4 = 450 XP
    Level 5 = 700 XP
    ...
    """

    thresholds = [0, 100, 250, 450, 700, 1000, 1400, 1850, 2350, 2900]

    level = 1
    for i, t in enumerate(thresholds):
        if xp >= t:
            level = i + 1

    return level
