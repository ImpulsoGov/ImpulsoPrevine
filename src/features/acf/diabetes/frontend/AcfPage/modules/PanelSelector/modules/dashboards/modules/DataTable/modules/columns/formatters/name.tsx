export const nameFormatter = (value: string ) : string => {
    const commonPrepositions = ['da', 'de', 'do', 'dos', 'das', 'e'];
    const namePieces = value.toLowerCase().split(" "); 
    const formattedNames = namePieces.map((piece) => {
        if(!commonPrepositions.includes(piece)) {
        return piece.charAt(0).toUpperCase() + piece.slice(1);
        }
        return piece;
    });
    return formattedNames.join(" ");
};

type NameFormatterProps = {
    value: string | null;
};

export const NameFormatter: React.FC<NameFormatterProps> = ({value})  => {
    if (!value) return <div data-testid="empty-return">{value}</div>;
    return <div data-testid="name-return">{nameFormatter(value)}</div>;
}