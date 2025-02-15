import IntervalTooltip from "@/app/ui/IntervalTooltip";
import React from "react";

interface IntervalProps {
  interval: number[];
  start: number;
  end: number;
  height: number;
  name: string;
  index: number;
}

const Interval: React.FC<IntervalProps> = (props) => {
  return (
    <IntervalTooltip interval={props.interval} name={props.name} key={`line-${props.index}`}>
      <div
        className="absolute w-0.5 bg-blue-500"
        style={{
          top: `${props.start}%`,
          height: `${props.height}%`
        }}
      />
      <div
        className="absolute w-2 h-2 bg-blue-500 rounded-full -left-[3px]"
        style={{ top: `${props.start}%` }}
      />
      <div
        className="absolute w-2 h-2 bg-blue-500 rounded-full -left-[3px]"
        style={{ top: `${props.end}%` }}
      />
    </IntervalTooltip>
  );
};

export default Interval;