import MissionCard from "@/components/MissionCard";

export default function RecentMissions() {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Recent Missions</h2>

      <div className="grid grid-cols-4 gap-4">
        <MissionCard title="USB Device Forensics" xp={250} difficulty="Beginner" tasksCompleted={5} totalTasks={5} thumbnail="/usb-thumbnail.png" />
        <MissionCard title="Log File Analysis" xp={300} difficulty="Beginner" tasksCompleted={3} totalTasks={5} thumbnail="/log-thumbnail.png" />
        <MissionCard title="Deleted Files Recovery" xp={400} difficulty="Intermediate" tasksCompleted={0} totalTasks={5} thumbnail="/deleted-thumbnail.png" />
        <MissionCard title="Network Forensics Basics" xp={400} difficulty="Intermediate" tasksCompleted={0} totalTasks={5} thumbnail="/network-thumbnail.png" />
      </div>
    </section>
  );
}
