import { Status } from "@/app/lib/types";
import presence from "@/data/presence.json";

export const currentTimestamp = new Date().getTime();
export const minTimestamp = Math.min(...Object.values(presence).map((p) => p.presence_intervals).flat(2))

// Convert timestamp to date and time 
export const getDateTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString()
}

// Convert timestamp to percentage of vertical position
export const getPositionPercentage = (timestamp: number): number => {  
  const total = currentTimestamp - minTimestamp;
  return ((timestamp - minTimestamp) / total) * 100;
};

export const beautifyStatus = (status: string): string => {
  switch (status) {
    case Status.PRESENT:
      return 'Present';
    case Status.ABSENT:
      return 'Absent';
    default:
      return '';
  }
}
