import type { ProfileIdValue } from "@/types/profile";

export const userHasAllProfiles = (
    userProfiles: Array<number>,
    profiles: Array<ProfileIdValue>
): boolean => {
    return profiles.every((profile) => userProfiles.includes(profile));
};
