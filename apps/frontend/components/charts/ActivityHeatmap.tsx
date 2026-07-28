"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function ActivityHeatmap({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const formatted = data.map((d) => [d.date, d.value]);

    chart.setOption({
      backgroundColor: "transparent",
      tooltip: {
        formatter: (p) => `${p.data[0]}<br/>Activity: ${p.data[1]}`
      },
      visualMap: {
        min: 0,
        max: 5,
        orient: "horizontal",
        left: "center",
        bottom: 0,
        inRange: {
          color: [
            "rgba(0, 255, 255, 0.05)",
            "rgba(0, 255, 255, 0.25)",
            "rgba(0, 255, 255, 0.5)",
            "rgba(255, 0, 255, 0.6)"
          ]
        }
      },
      calendar: {
        range: "2026",
        cellSize: ["auto", 18],
        itemStyle: {
          borderWidth: 0.5,
          borderColor: "rgba(0,255,255,0.2)"
        },
        splitLine: {
          lineStyle: {
            color: "rgba(0,255,255,0.1)"
          }
        },
        dayLabel: {
          color: "#A8B2D1"
        },
        monthLabel: {
          color: "#A8B2D1"
        },
        yearLabel: {
          color: "#A8B2D1"
        }
      },
      series: [
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          data: formatted
        }
      ]
    });

    return () => chart.dispose();
  }, [data]);

  return (
    <div className="bg-[#0D162B] border border-[#1B2A4A] rounded-xl p-6 shadow-[0_0_20px_rgba(0,229,255,0.15)]">
      <h3 className="text-lg font-semibold text-cyan-200 mb-4">Activity Heatmap</h3>
      <div ref={chartRef} className="w-full h-72" />
    </div>
  );
}
