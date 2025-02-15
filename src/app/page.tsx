import PresenceTimeline from "@/app/ui/PresenceTimeline";
import presence from "@/data/presence.json";
import profiles from "@/data/profiles.json";

const Home = () => {
  return (
    <div className="p-4 h-full bg-background">
      <div className="text-2xl font-bold text-white">Presence Timeline</div>
      <div
        className="bg-white rounded-lg pt-4 pb-4 mt-4 h-full overflow-x-auto"
        data-testid="presence-timeline"
      >
        <PresenceTimeline
          presenceData={presence}
          profileData={profiles}
        />
      </div>
    </div>
  );
}

export default Home;
