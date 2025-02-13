import IntervalTooltip from "@/app/ui/IntervalTooltip";
import React from "react";

interface IntervalProps {
  interval: number[];
  start: number;
  height: number;
  name: string;
  index: number;
  getPositionPercentage: (value: number) => number;
}

const Interval: React.FC<IntervalProps> = (props) => {
  return (
    <>
      <IntervalTooltip interval={props.interval} name={props.name} key={`line-${props.index}`}>
        <div
          className="absolute w-0.5 bg-blue-500"
          style={{
            top: `${props.start}%`,
            height: `${props.height}%`
          }}
        />
      </IntervalTooltip>
      <IntervalTooltip interval={props.interval} name={props.name} key={`start-${props.index}`}>
        <div
          className="absolute w-2 h-2 bg-blue-500 rounded-full -left-[3px]"
          style={{ top: `${props.getPositionPercentage(props.interval[0])}%` }}
        />
      </IntervalTooltip>
      <IntervalTooltip interval={props.interval} name={props.name} key={`end-${props.index}`}>
        <div
          className="absolute w-2 h-2 bg-blue-500 rounded-full -left-[3px]"
          style={{ top: `${props.getPositionPercentage(props.interval[1])}%` }}
        />
      </IntervalTooltip>
    </>
  );
};

export default Interval;