export const nameFormatter = (value: string | undefined): string => {
    if (!value) return "-";
    const commonPrepositions = ["da", "de", "do", "dos", "das", "e"];
    const namePieces = value.toLowerCase().split(" ");
    const formattedNames = namePieces.map((piece) => {
        if (!commonPrepositions.includes(piece)) {
            return piece.charAt(0).toUpperCase() + piece.slice(1);
        }
        return piece;
    });
    return formattedNames.join(" ");
};

export const teamNameFormatter = (value: string | null | undefined): string => {
    if (!value) return "-";

    const commonPrepositions = ["da", "de", "do", "dos", "das", "e", "e/"];
    const commonAcronyms = ["ESF", "PSF", "EAP"]; // adicione aqui outras siglas conhecidas

    const namePieces = value.split(" ");

    const formattedNames = namePieces.map((piece) => {
        const upperPiece = piece.toUpperCase();
        const lowerPiece = piece.toLowerCase();

        if (commonAcronyms.includes(upperPiece)) {
            return upperPiece;
        }

        if (/^[ivxlcdm]+$/i.test(piece)) {
            return piece;
        }

        if (commonPrepositions.includes(lowerPiece)) {
            return lowerPiece;
        }

        return piece.charAt(0).toUpperCase() + piece.slice(1).toLowerCase();
    });

    return formattedNames.join(" ");
};
