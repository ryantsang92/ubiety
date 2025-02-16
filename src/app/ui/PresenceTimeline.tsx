'use client'

import React from 'react';
import profiles from "@/data/profiles.json";
import TimelineItem from '@/app/ui/TimelineItem';
import { Category, Presence, Status } from '@/app/lib/types';
import { getDateTime, maxTimestamp, minTimestamp } from '@/app/lib/utils';

interface PresenceProps {
  presenceData: Presence;
  profileData: typeof profiles;
}

const PresenceTimeline: React.FC<PresenceProps> = (props) => {
  return (
    <div className="flex justify-around h-screen pl-4 pb-4">
      <div className='flex flex-col justify-between h-full w-8 items-start'>
        <div
          className='relative text-black top-8 text-right text-xs'
          data-testid="min-timestamp"
        >
          {getDateTime(minTimestamp)}
        </div>
        <div
          className='relative text-black top-8 text-right text-xs bottom-8'
          data-testid="current-timestamp"
        >
          {getDateTime(maxTimestamp)}
        </div>
      </div>
      {props.profileData.map((profile) => {
        return props.presenceData[profile.uid.toString()] !== undefined && (
          <div
            key={profile.uid}
            className='relative w-32 h-full'
            data-testid={`timeline-item-${profile.uid}`}
          >
            <TimelineItem
              key={profile.uid}
              name={profile.name}
              photoUrl={profile.photo_url}
              category={profile.category as Category}
              intervals={props.presenceData[profile.uid]?.presence_intervals}
              currentStatus={props.presenceData[profile.uid]?.current_status as Status}
            />
          </div>
        )
      })}
    </div>
  );
};

export default PresenceTimeline;