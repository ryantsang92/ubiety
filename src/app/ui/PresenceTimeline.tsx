'use client'

import React from "react";
import { Presence } from "@/app/lib/types";

interface PresenceTimelineProps {
  presences: Presence[]
}

const PresenceTimeline: React.FC<PresenceTimelineProps> = (props) => {
  const flattenedPresences = props.presences.map((presence) => {
    return presence.presence_intervals.map((interval) => {
      return {
        status: presence.current_status,
        name: presence.profile,
        low: interval[0],
        high: interval[1]
      }
    })
  }).flat()

  const flattenedPresencesGroupedByProfile = flattenedPresences.reduce((acc, presence) => {
    if (!acc[presence.name.uid]) {
      acc[presence.name.uid] = {
        name: presence.name,
        presences: []
      }
    }

    acc[presence.name.uid].presences.push(presence)
    return acc
  }, {} as Record<number, { name: any, presences: any[] }>)

  console.log(flattenedPresencesGroupedByProfile)
  
  const lines = Object.values(flattenedPresencesGroupedByProfile).map((profile, index) => {
    return {
      id: index,
      image: profile.name.photo_url,
      dots: profile.presences.map((presence) => {
        return (presence.low + presence.high) / 2 / 100
      })
    }
  })

  console.log(lines)

  // Generate grid values (0 to 100 by steps of 10)
  const gridValues = Array.from({ length: 11 }, (_, i) => i * 10);

  return (
    <div className="w-full h-screen flex items-center justify-center p-8">
      <div className="relative flex flex-col">
        <div className="relative flex h-96">
          {/* Y-axis */}
          <div className="flex flex-col justify-between mr-4 text-sm text-gray-500">
            {gridValues.reverse().map((value) => (
              <div key={value} className="h-4 flex items-center">
                {value}
              </div>
            ))}
          </div>

          {/* Grid and lines container */}
          <div className="relative">
            {/* Horizontal grid lines */}
            {gridValues.map((value) => (
              <div
                key={value}
                className="absolute w-full border-t border-gray-200"
                style={{
                  top: `${100 - value}%`,
                  left: 0,
                  right: 0
                }}
              />
            ))}

            {/* Vertical lines with dots */}
            <div className="flex gap-20 h-full relative pl-12 pr-12">
              {lines.map((line) => (
                <div key={line.id} className="relative">
                  {/* Draw line segments between dots */}
                  {line.dots.map((_, index) => {
                    if (index === line.dots.length - 1) return null;
                    const startPos = line.dots[index];
                    const endPos = line.dots[index + 1];
                    const height = (endPos - startPos) * 100;
                    return (
                      <div
                        key={index}
                        className="absolute w-0.5 bg-blue-500"
                        style={{
                          top: `${startPos * 100}%`,
                          height: `${height}%`
                        }}
                      />
                    );
                  })}
                  
                  {/* Dots */}
                  {line.dots.map((position, index) => (
                    <div
                      key={index}
                      className="absolute w-2.5 h-2.5 bg-blue-500 rounded-full -left-1"
                      style={{
                        top: `${position * 100}%`,
                        transform: 'translateY(-50%)'
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* X-axis with images */}
        <div className="flex gap-12 mt-8 ml-20">
          {lines.map((line) => (
            <div key={line.id} className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-blue-500">
                <img 
                  src={line.image} 
                  alt="tick mark" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PresenceTimeline;
