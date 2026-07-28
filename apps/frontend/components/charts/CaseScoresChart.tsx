"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function CaseScoresChart({ scores }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const labels = scores.map((s) => `Case ${s.case_id}`);
    const values = scores.map((s) => s.score);

    chart.setOption({
      backgroundColor: "transparent",
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: labels,
        axisLabel: { color: "#A8B2D1" },
        axisLine: { lineStyle: { color: "rgba(0,255,255,0.3)" } },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: "#A8B2D1" },
        axisLine: { lineStyle: { color: "rgba(0,255,255,0.3)" } },
        splitLine: { lineStyle: { color: "rgba(0,255,255,0.1)" } },
      },
      series: [
        {
          data: values,
          type: "bar",
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#00e5ff" },
              { offset: 1, color: "#0066ff" },
            ]),
          },
        },
      ],
    });

    return () => chart.dispose();
  }, [scores]);

  return (
    <div className="bg-[#0D162B] border border-[#1B2A4A] rounded-xl p-6 shadow-[0_0_20px_rgba(0,229,255,0.15)]">
      <h3 className="text-lg font-semibold text-cyan-200 mb-4">Case Scores Over Time</h3>
      <div ref={chartRef} className="w-full h-80" />
    </div>
  );
}
