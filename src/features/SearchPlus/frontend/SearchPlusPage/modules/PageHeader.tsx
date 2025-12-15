import Image from "next/image";

export const PageHeader: React.FC = () => {
    return (
        <div
            style={{
                padding: "20px 0px",
                fontSize: "48px",
                fontWeight: "bold",
                textAlign: "left",
                alignSelf: "flex-start",
                paddingLeft: "80px",
                paddingRight: "80px",
            }}
        >
            <span>
                <Image
                    src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmixjv0d303b707lv69ps3j30"
                    alt="Busca+Mais Logo"
                    width={56}
                    height={28}
                />
            </span>{" "}
            busca+mais
        </div>
    );
};
