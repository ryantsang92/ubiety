import React from 'react';
// import Image from 'next/image';
import Avatar from '@/app/ui/Avatar';
import { currentTimestamp, getPositionPercentage } from '@/app/lib/utils';
import { Status } from '@/app/lib/types';
import Interval from '@/app/ui/Interval';

interface TimelineItemProps {
  name: string;
  photoUrl: string | null;
  intervals: number[][];
  currentStatus: Status;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ name, photoUrl, intervals, currentStatus }) => {
  // if the current status is present, update the last interval to the current timestamp
  if (currentStatus === Status.PRESENT) {
    const maxTimestamp = Math.max(...intervals.flat());

    intervals = intervals.map(interval => 
      interval.map(value => value === maxTimestamp ? currentTimestamp : value)
    );
  }

  return (
    <div className="flex flex-col items-center w-32 h-full pl-4 pr-4 min-w-[8rem] max-w-[8rem]">
      <div className="mb-2">
        {photoUrl ? (
          <Avatar
            className="w-10 h-10"
            name={name}
            currentStatus={currentStatus}
          >
            {/* <Image src={photoUrl} alt={name} layout="fill" objectFit="cover" className="rounded-full" /> */}
            <img src={photoUrl} alt={name} className="w-full h-full object-cover rounded-full" />
          </Avatar>
        ) : (
          <Avatar
            className="w-10 h-10 bg-blue-500 text-white"
            name={name}
            currentStatus={currentStatus}
          >
            <span className="text-lg">{name.charAt(0)}</span>
          </Avatar>
        )}
      </div>
      <div className="relative h-full w-0.5">
        <div className="absolute top-0 left-0 w-0.5 h-full bg-gray-200">
          {intervals.map((interval, index) => {
            const start = getPositionPercentage(interval[0]);
            const end = getPositionPercentage(interval[1]);
            const height = end - start;
            
            return (
              <Interval
                key={index}
                interval={interval}
                start={start}
                height={height}
                name={name}
                index={index}
                getPositionPercentage={getPositionPercentage}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;