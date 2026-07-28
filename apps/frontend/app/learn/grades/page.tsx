"use client";

import WithSidebar from "@/app/components/WithSidebar";
import BackButton from "@/app/components/BackButton";

export default function GradesPage() {
  return (
    <WithSidebar>
      <BackButton />
      <h1>Your Grades</h1>
    </WithSidebar>
  );
}
