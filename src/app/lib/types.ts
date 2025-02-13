export enum Status {
  PRESENT = 'present',
  ABSENT = 'absent',
}

export type Profile = {
  uid: number
  created_at: number
  name: string
  photo_url: string | null
  category: string | null
};

export type Presence = {
  profile: Profile
  presence_intervals: number[][]
  current_status: Status
}