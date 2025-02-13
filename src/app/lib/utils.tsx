import { Status } from "@/app/lib/types";
import presence from "@/data/presence.json";

export const currentTimestamp = new Date().getTime();

// Convert timestamp to percentage of vertical position
export const getPositionPercentage = (timestamp: number) => {
  const minTimestamp = Math.min(...Object.values(presence).map((p) => p.presence_intervals).flat(2))
  
  const total = currentTimestamp - minTimestamp;
  return ((timestamp - minTimestamp) / total) * 100;
};

export const beautifyStatus = (status: string) => {
  switch (status) {
    case Status.PRESENT:
      return 'Present';
    case Status.ABSENT:
      return 'Absent';
    default:
      return '';
  }
}
