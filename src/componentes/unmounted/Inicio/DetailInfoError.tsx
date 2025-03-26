import Image from "next/image";

export const DetailInfoError: React.FC<{ error: string }> = ({ error }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
            }}
        >
            <Image
                src="https://media.graphassets.com/a6Y5YbVzSfmM6QXCW0q3"
                alt="Ícone de carregamento"
                width={90}
                height={60}
            />
            <p
                style={{
                    color: "#606E78",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "18.2px",
                }}
            >
                <span
                    style={{
                        marginRight: "5px",
                        display: "inline-block",
                        verticalAlign: "middle",
                    }}
                >
                    <Image
                        src="https://media.graphassets.com/C2ic3rsScOkYLsRSTalo"
                        alt="Ícone de alerta"
                        width={14}
                        height={14}
                    />
                </span>
                {error}
            </p>
        </div>
    );
};
