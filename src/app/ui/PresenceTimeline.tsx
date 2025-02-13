'use client'

import React from 'react';
import profiles from "@/data/profiles.json";
import TimelineItem from '@/app/ui/TimelineItem';
import { Presence, Status } from '@/app/lib/types';

interface PresenceProps {
  presenceData: Presence;
  profileData: typeof profiles;
}

const PresenceTimeline: React.FC<PresenceProps> = (props) => {
  return (
    <div className="flex justify-around gap-8 h-screen pb-4">
      {props.profileData.map((profile) => {
        return props.presenceData[profile.uid.toString()] !== undefined && (
          <TimelineItem
            key={profile.uid}
            name={profile.name}
            photoUrl={profile.photo_url}
            intervals={props.presenceData[profile.uid]?.presence_intervals}
            currentStatus={props.presenceData[profile.uid]?.current_status as Status}
          />
        )
      })}
    </div>
  );
};

export default PresenceTimeline;