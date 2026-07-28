"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import BadgeGrid from "@/components/badges/BadgeGrid";
import { LevelProgressBar } from "@/components/ui/LevelProgressBar";
import StreakCard from "@/components/profile/StreakCard";
import RadarSkillsChart from "@/components/charts/RadarSkillsChart";
import CaseScoresChart from "@/components/charts/CaseScoresChart";
import ActivityHeatmap from "@/components/charts/ActivityHeatmap";
import ActivityFeed from "@/components/activity/ActivityFeed";

type XpData = {
  xp: number;
};

type LevelData = {
  level: number;
  progress_percent: number;
  next_level_xp: number | null;
};

type ProfileData = {
  xp: number;
  level: number;
  streak_days: number;
  longest_streak: number;
};

export default function AnalystProfilePage() {
  const [xpData, setXpData] = useState<XpData | null>(null);
  const [levelData, setLevelData] = useState<LevelData | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [allBadges, setAllBadges] = useState<any[]>([]);
  const [myBadges, setMyBadges] = useState<number[]>([]);

  useEffect(() => {
    apiGet("/analyst/xp").then((res) => setXpData(res));
    apiGet("/analyst/level").then((res) => setLevelData(res));
    apiGet("/analyst/profile").then((res) => setProfile(res));

    apiGet("/analyst/badges/all").then((res) => setAllBadges(res.badges));
    apiGet("/analyst/badges").then((res) =>
      setMyBadges(res.badges.map((b: any) => b.badge_id))
    );
  }, []);

  if (!xpData || !levelData || !profile) {
    return (
      <div className="min-h-screen bg-[#050814] text-white flex items-center justify-center">
        <p className="text-cyan-300">Loading profile...</p>
      </div>
    );
  }

  const level = levelData.level;
  const xp = xpData.xp;
  const progress = levelData.progress_percent;
  const nextLevelXp = levelData.next_level_xp;

  return (
    <div className="min-h-screen bg-[#050814] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-wide">Analyst Profile</h1>
            <p className="text-sm text-[#A8B2D1] mt-1">
              Your experience, achievements, and progression as a cyber analyst.
            </p>
          </div>

          {/* Level Badge */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-24 h-28 bg-gradient-to-b from-[#0F1E3A] to-[#050814] border border-cyan-400/80 rounded-t-xl rounded-b-3xl shadow-[0_0_30px_rgba(0,229,255,0.8)] flex items-center justify-center">
              <span className="text-cyan-100 font-bold text-2xl">Lv {level}</span>
            </div>
          </div>
        </div>

        {/* XP PROGRESS */}
        <LevelProgressBar
          level={level}
          xp={xp}
          progressPercent={progress}
          nextLevelXp={nextLevelXp}
        />

        {/* STATS + STREAK GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard label="Total XP" value={xp} />
          <StatCard label="Level" value={level} />
          <StatCard label="Badges" value={myBadges.length} />
          <StatCard label="Next Level XP" value={nextLevelXp ?? "Max"} />
          <StreakCard
            streak={profile.streak_days}
            longest={profile.longest_streak}
          />
        </div>

	{/* PERFORMANCE SECTION */}
	<div className="space-y-10">
  	  <h2 className="text-2xl font-semibold text-cyan-200">Performance</h2>
  	  <RadarSkillsChart data={categories} />
  	  <CaseScoresChart scores={scores} />
	</div>

	{/* ACTIVITY HEATMAP */}
	<div className="space-y-4">
  	  <h2 className="text-2xl font-semibold text-cyan-200">Activity</h2>
  	  <ActivityHeatmap data={activity} />
	</div>

	{/* RECENT ACTIVITY FEED */}
	<div className="space-y-4">
  	  <h2 className="text-2xl font-semibold text-cyan-200">Recent Activity</h2>
  	  <ActivityFeed events={feed} />
	</div>


        {/* BADGES SECTION */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-cyan-200">Badges</h2>
          <p className="text-sm text-[#A8B2D1]">
            Your unlocked achievements across all categories.
          </p>

          <BadgeGrid badges={allBadges} unlocked={myBadges} />
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-[#0D162B] border border-[#1B2A4A] rounded-xl p-5 shadow-[0_0_20px_rgba(0,229,255,0.15)]">
      <p className="text-xs text-[#A8B2D1] tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-cyan-200 mt-1">{value}</p>
    </div>
  );
}
const [scores, setScores] = useState([]);
const [categories, setCategories] = useState({});

useEffect(() => {
  apiGet("/analyst/performance/scores").then((res) => setScores(res.scores));
  apiGet("/analyst/performance/categories").then((res) =>
    setCategories(res.categories)
  );
}, []);
const [activity, setActivity] = useState([]);

useEffect(() => {
  apiGet("/analyst/activity/heatmap").then((res) => setActivity(res.activity));
}, []);
const [feed, setFeed] = useState([]);

useEffect(() => {
  apiGet("/analyst/activity/feed").then((res) => setFeed(res.events));
}, []);
