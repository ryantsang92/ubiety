import React from 'react';
import Image from 'next/image';
import Avatar from '@/app/ui/Avatar';
import { currentTimestamp, getPositionPercentage } from '@/app/lib/utils';
import { Category, Status } from '@/app/lib/types';
import Interval from '@/app/ui/Interval';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

interface TimelineItemProps {
  name: string;
  photoUrl: string | null;
  category: Category | null;
  intervals: number[][];
  currentStatus: Status;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ name, photoUrl, category, intervals, currentStatus }) => {
  // if the current status is present, update the last interval to the current timestamp
  if (currentStatus === Status.PRESENT) {
    const maxTimestamp = Math.max(...intervals.flat());

    intervals = intervals.map(interval => 
      interval.map(value => value === maxTimestamp ? currentTimestamp : value)
    );
  }

  const placeholderImage = (category: Category | null) => {
    switch (category) {
      case Category.FAMILY:
        return <GroupIcon />;
      case Category.VISITOR:
        return <PersonIcon />;
      default:
        return <QuestionMarkIcon />;
    }
  }

  return (
    <div className="flex flex-col items-center w-32 h-full pl-4 pr-4 min-w-[8rem] max-w-[8rem]">
      <div
        className="mb-1"
        data-testid="avatar"
      >
        {photoUrl ? (
          <Avatar
            name={name}
            currentStatus={currentStatus}
          >
            <Image
              src={photoUrl}
              alt={name}
              width={40}
              height={40}
              className="rounded-full"
            />
          </Avatar>
        ) : (
          <Avatar
            className="bg-blue-500 text-white text-center"
            name={name}
            currentStatus={currentStatus}
          >
            {placeholderImage(category)}
          </Avatar>
        )}
      </div>
      <div className="relative h-full w-0.5">
        <div
          className="absolute top-0 left-0 w-0.5 h-full bg-gray-200"
          data-testid="intervals"
        >
          {intervals.map((interval, index) => {
            const start = getPositionPercentage(interval[0]);
            const end = getPositionPercentage(interval[1]);
            const height = end - start;
            
            return (
              <Interval
                key={index}
                interval={interval}
                start={start}
                end={end}
                height={height}
                name={name}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;