export type Profile = {
  uid: number;
  created_at: number;
  name: string;
  photo_url: string;
  category: string;
};

export type Presence = {
  profile: Profile;
  presence_intervals: number[][];
  current_status: string;
}