type CaptionProps = {
    title: string;
    items: CaptionItemProps;
};

type CaptionItemProps = Array<{
    label: string;
    value: string;
}>;

export const Caption: React.FC<CaptionProps> = ({ title, items }) => {
    return (
        <div
            style={{
                color: "#606E78",
                fontFamily: "Inter",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "130%",
                display: "flex",
                flexDirection: "column",
                letterSpacing: "-0.32px",
                gap: "4px",
            }}
        >
            <div>{title}</div>
            {items.map((item, index) => (
                <div key={index} style={{ marginLeft: "12px" }}>
                    <div>
                        • {item.label}:
                        <span style={{ fontWeight: 400, marginLeft: "6px" }}>
                            {item.value}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};
