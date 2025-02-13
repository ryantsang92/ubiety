import PresenceTimeline from "@/app/ui/PresenceTimeline";
import presence from "@/data/presence.json";
import profiles from "@/data/profiles.json";

export default function Home() {
  const profilePresences = Object.entries(presence).map(([key, p]) => {
    const profile = profiles.find((profile) => profile.uid === parseInt(key));
    return profile ? {
      ...p,
      profile,
    } : null;
  }).filter(p => p !== null);
  
  console.log(profilePresences)

  return (
    <div>
      <PresenceTimeline presences={profilePresences}/>
    </div>
  );
}
