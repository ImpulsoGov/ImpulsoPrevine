export const PROFILE_ID = {
    userManagement: 2,
    impulser: 5,
    COAPS: 8,
    COEQ: 9,
} as const;
  
export type ProfileId = typeof PROFILE_ID;
export type ProfileIdKey = keyof ProfileId;
export type ProfileIdValue = ProfileId[ProfileIdKey];