export const CellWithDivider = ({
    children,
}: {
    children: React.ReactNode;
}): React.ReactElement => (
    <div
        style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: "100%",
            borderRight: "1px solid #ACACAC",
        }}
    >
        {children}
    </div>
);
