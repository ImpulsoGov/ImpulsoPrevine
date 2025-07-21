import type { ProfileIdValue } from "@/types/profile";

export const userHasAnyAllowedProfile = (
    userProfiles: Array<number>,
    profiles: Array<ProfileIdValue>
): boolean => {
    return profiles.some((profile) => userProfiles.includes(profile));
};
