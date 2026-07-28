"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import BadgeGrid from "@/components/badges/BadgeGrid";

export default function BadgesPage() {
  const [allBadges, setAllBadges] = useState([]);
  const [myBadges, setMyBadges] = useState([]);

  useEffect(() => {
    apiGet("/analyst/badges/all").then((res) => setAllBadges(res.badges));
    apiGet("/analyst/badges").then((res) =>
      setMyBadges(res.badges.map((b) => b.badge_id))
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#050814] text-white py-10 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold tracking-wide">My Badges</h1>
        <p className="text-sm text-[#A8B2D1]">
          Collect badges by completing actions, leveling up, and improving your
          analyst skills.
        </p>

        <BadgeGrid badges={allBadges} unlocked={myBadges} />
      </div>
    </div>
  );
}
