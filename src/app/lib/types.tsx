export enum Status {
  PRESENT = 'present',
  ABSENT = 'absent',
}

export enum Category {
  FAMILY = 'family',
  VISITOR = 'visitor',
}

export type Profile = {
  uid: number
  created_at: number
  name: string
  photo_url: string | null
  category: string | null
};

export type Presence = {
  [key: string]: {
    presence_intervals: number[][];
    current_status: string;
  };
}
