'use client'
import React from "react";
import Tooltip from '@mui/material/Tooltip';

interface IntervalTooltipProps {
  interval: number[];
  name: string;
  key: number| string;
}

const IntervalTooltip: React.FC<React.PropsWithChildren<IntervalTooltipProps>> = (props) => {
  return (
    <Tooltip
      title={
        <div className='flex flex-col'>
          <div className="font-bold">
            {props.name}
          </div>
          <div>
            {`Time: ${new Date(props.interval[0]).toLocaleString()} - ${new Date(props.interval[1]).toLocaleString()}`}
          </div>
        </div>
      }
      key={props.key}
    >
      {props.children as React.ReactElement}
    </Tooltip>
  );
}

export default IntervalTooltip;
