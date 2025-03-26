export enum ProfileNames {
    APS = "aps",
    EQUIPE = "equipe",
}

export function getUserProfileName(profileNumbers: number[]): string {
    if (profileNumbers.includes(5) || profileNumbers.includes(8)) {
        return ProfileNames.APS;
    }

    if (profileNumbers.includes(9)) {
        return ProfileNames.EQUIPE;
    }

    return "";
}
