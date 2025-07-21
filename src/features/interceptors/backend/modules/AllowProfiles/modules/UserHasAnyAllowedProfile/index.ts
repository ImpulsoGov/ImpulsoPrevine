import type { ProfileIdValue } from "@/types/profile";

export const userHasAnyAllowedProfile = (
    userProfiles: Array<number>,
    profiles: Array<ProfileIdValue>
): boolean => {
    if (profiles.length === 0) {
        return true;
    }

    return profiles.some((profile) => userProfiles.includes(profile));
};
