'use client'

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Apple", value: 400, img: "https://fakeimg.pl/600x400" },
  { name: "Banana", value: 300, img: "https://via.placeholder.com/40" },
  { name: "Cherry", value: 500, img: "https://via.placeholder.com/40" },
  { name: "Date", value: 200, img: "https://via.placeholder.com/40" },
];

// Custom X-Axis Tick Component
const CustomXAxisTick: React.FC<{ x?: number; y?: number; payload?: any }> = ({ x, y, payload }) => {
  const { value } = payload;
  const item = data.find((d) => d.name === value);

  return (
    <g transform={`translate(${x},${y+40})`}>
      {/* SVG Circle Mask for Rounded Image */}
      <defs>
        <clipPath id={`clip-${value}`}>
          <circle cx="15" cy="15" r="15" />
        </clipPath>
      </defs>
      {/* Image with Clipping Path */}
      <image
        href={item?.img}
        // x={-15}
        // y={10}
        height="30"
        width="30"
        clipPath={`url(#clip-${value})`}
      />
      <text x={0} y={10} textAnchor="middle" fontSize={12} fill="#666">
        {value}
      </text>
    </g>
  );
};

const CustomChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50, right: 30, left: 20, bottom: 50 }}>
        <XAxis dataKey="name" tick={<CustomXAxisTick />} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomChart;
