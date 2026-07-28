"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function RadarSkillsChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const labels = Object.keys(data);
    const values = Object.values(data);

    chart.setOption({
      backgroundColor: "transparent",
      tooltip: {},
      radar: {
        indicator: labels.map((l) => ({ name: l, max: Math.max(...values) || 10 })),
        splitLine: { lineStyle: { color: "rgba(0,255,255,0.2)" } },
        splitArea: { areaStyle: { color: "transparent" } },
        axisLine: { lineStyle: { color: "rgba(0,255,255,0.3)" } },
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: values,
              name: "Performance",
              areaStyle: { color: "rgba(0,255,255,0.3)" },
              lineStyle: { color: "#00e5ff" },
              symbol: "circle",
              symbolSize: 6,
              itemStyle: { color: "#00e5ff" },
            },
          ],
        },
      ],
    });

    return () => chart.dispose();
  }, [data]);

  return (
    <div className="bg-[#0D162B] border border-[#1B2A4A] rounded-xl p-6 shadow-[0_0_20px_rgba(0,229,255,0.15)]">
      <h3 className="text-lg font-semibold text-cyan-200 mb-4">Skill Breakdown</h3>
      <div ref={chartRef} className="w-full h-80" />
    </div>
  );
}
