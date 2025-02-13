import { Status } from "@/app/lib/types";
import PresenceTimeline from "@/app/ui/PresenceTimeline";
import CustomChart from "@/app/ui/TestChart";
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
    <div className="p-4">
      <div className="text-2xl font-bold text-white">Presence Timeline</div>
      <div className="bg-white rounded-lg pt-4 pb-4 mt-4">
        <PresenceTimeline presences={profilePresences}/>
        {/* <CustomChart /> */}
      </div>
    </div>
  );
}

export default Home;
