"use client";

import BadgeCard from "./BadgeCard";

export default function BadgeGrid({ badges, unlocked }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {badges.map((b) => (
        <BadgeCard
          key={b.id}
          name={b.name}
          tier={b.tier}
          icon={b.icon}
          unlocked={unlocked.includes(b.id)}
        />
      ))}
    </div>
  );
}
