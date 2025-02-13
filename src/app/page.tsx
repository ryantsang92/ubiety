import { Status } from "@/app/lib/types";
import PresenceTimeline from "@/app/ui/PresenceTimeline";
import presence from "@/data/presence.json";
import profiles from "@/data/profiles.json";

const Home = () => {
  const profilePresences = Object.entries(presence)
    .map(([key, p]) => {
      const max = Math.max(...p.presence_intervals.flat());
      const currentTimestamp = Date.now();
      
      if (p.current_status === Status.PRESENT as Status) {
        p.presence_intervals = p.presence_intervals.map(interval => 
          interval.map(value => value === max ? currentTimestamp : value)
        );
      }

      const profile = profiles.find((profile) => profile.uid === parseInt(key));

      return profile ? {
        ...p,
        current_status: p.current_status as Status,
        profile,
      } : null;
    })
    .filter(p => p !== null);
  
  console.log(profilePresences)

  return (
    <div>
      <PresenceTimeline presences={profilePresences}/>
    </div>
  );
}

export default Home;
