'use client'

import { Presence } from "@/app/lib/types";
import React from "react";
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ReferenceLine,
  Label
} from "recharts";

interface PresenceTimelineProps {
  presences: Presence[]
}

const PresenceTimeline: React.FC<PresenceTimelineProps> = (props) => {
  const uniqueProfiles = Array.from(new Set(props.presences.map(p => p.profile)));
  console.log(uniqueProfiles)

  const profileIndexMap: Record<string, number> = uniqueProfiles.reduce((acc, profile, index) => {
    acc[profile.name] = index + 1; // Start index at 1
    return acc;
  }, {} as Record<string, number>);

  // Convert data to numeric X values
  const processedData = props.presences.map(p => {
    const profileIndex = profileIndexMap[p.profile.name];
    console.log(p)
    return p.presence_intervals.map(interval => 
      interval.map(value => (
        {
          x: profileIndex,
          y: value,
          interval: interval,
          name: p.profile.name,
          status: p.current_status
        }
      )
    ));
  }).flat(2);

  console.log(processedData)

  const minTimestamp = Math.min(...processedData.map(d => d.y));
  const currentTimestamp = Date.now();

  const CustomXAxisTick: React.FC<{ x?: number; y?: number; payload?: any }> = ({ x, y, payload }) => {
    const { value } = payload;

    if (!payload) return null;
    const profile = uniqueProfiles[payload.value - 1]; // Get profile
  
    return (
      <g transform={`translate(${x},${y - 38})`}>
        {/* SVG Circle Mask for Rounded Image */}
        <defs>
          <clipPath id={`clip-${value}`}>
            <circle cx="15" cy="15" r="15" />
          </clipPath>
        </defs>
        {profile.photo_url && (
          // <div
          //   className="w-7 h-7 rounded-full overflow-hidden border-2 border-blue-500 mr-16"
          //   onMouseOver={() => console.log(profile)}
          //   onClick={(e) => console.log(profile)}
          // >
            <image
              href={profile.photo_url}
              x={0}
              y={0}
              width="30"
              height="30"
              clipPath={`url(#clip-${value})`}
            />
          // </div>
        )}
        {/* <text textAnchor="middle" fontSize={12}>
          {profile.name}
        </text> */}
      </g>
    );
  };

  const CustomYAxisTick: React.FC<{ payload?: any }> = ({ payload }) => {
    console.log(new Date(payload.value).toLocaleTimeString())
    return (
      <text fontSize={12}>
        {new Date(payload.value).toLocaleTimeString()}
      </text>
    );
  }

  const CustomTooltip: React.FC = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const p = payload[0].payload
      return (
        <div className="bg-white p-4 shadow-md rounded-lg text-black">
          <div className="font-bold">{`${p.name}`}</div>
          <div>{`Status: ${p.status}`}</div>
          <div>{`Time: ${new Date(p.interval[0]).toLocaleDateString()} ${new Date(p.interval[0]).toLocaleTimeString()} - ${new Date(p.interval[1]).toLocaleDateString()} ${new Date(p.interval[1]).toLocaleTimeString()}`}</div>
        </div>
      );
    }
  
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={1900}>
      <ScatterChart>
        <defs>
          <linearGradient id="colorUv" x1="1" y1="1" x2="0" y2="0">
            <stop offset="30%" stopColor="#6584FF" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number" 
          dataKey="x"
          domain={[0, uniqueProfiles.length + 1]} 
          height={100}
          ticks={Object.values(profileIndexMap)}
          // tickFormatter={(tick) => uniqueProfiles[tick - 1]} // Adjust index lookup
          tick={<CustomXAxisTick />}
          orientation="top"
        />
        <YAxis
          type="number"
          dataKey={'y'}
          domain={[minTimestamp - 100000000, currentTimestamp + 100000000]}
          tickCount={20}
          width={80}
          tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
          // tick={<CustomYAxisTick />}
          // tick={{stroke: 'red', strokeWidth: 2}}
          interval='equidistantPreserveStart'
          // includeHidden
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={<CustomTooltip />}
        />

        {/* Render Custom Vertical Lines */}
        {processedData.map((d, i) => {
          return (
            <ReferenceLine
              key={i}
              stroke="green"
              strokeWidth={2}
              segment={[{ x: d.x, y: d.interval[0] }, { x: d.x, y: d.interval[1] }]}
            />
          )
        })}

        {/* Render Scatter Points */}
        <Scatter data={processedData} fill="blue" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default PresenceTimeline;
