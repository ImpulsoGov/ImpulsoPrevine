type Instruction = {
    title: string;
    description: string;
};

export const Instructions: React.FC<{ data: Array<Instruction> }> = ({
    data,
}) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "23px" }}>
            {data.map((item, index) => (
                <div
                    key={`${item.title}-${String(index)}`}
                    style={{
                        display: "flex",
                        gap: "12px",
                        color: "#104978",
                        fontWeight: 600,
                    }}
                >
                    <div
                        style={{
                            height: "fit-content",
                            border: "2px solid #4294D8",
                            borderRadius: "100px",
                            padding: "3px 5px",
                            color: "#4294D8",
                            fontSize: "16px",
                        }}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                        <p
                            style={{
                                margin: "6px 0px",
                                fontSize: "17px",
                            }}
                        >
                            {item.title}
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: "16px",
                                fontWeight: 400,
                            }}
                        >
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
