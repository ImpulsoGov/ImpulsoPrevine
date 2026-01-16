import Image from "next/image";
type Props = {
    isSearchPlusABEnabled: boolean;
};
export const PageHeader: React.FC<Props> = ({ isSearchPlusABEnabled }) => {
    return (
        <div
            style={{
                width: "100%",
                paddingLeft: 80,
                paddingRight: 80,
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: isSearchPlusABEnabled
                        ? "flex-start"
                        : "center",
                    alignItems: "center",
                    padding: "20px 0",
                    fontSize: "48px",
                    fontWeight: "bold",
                    gap: "8px",
                }}
            >
                <Image
                    src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmixjv0d303b707lv69ps3j30"
                    alt="Busca+Mais Logo"
                    width={56}
                    height={28}
                />
                busca+mais
            </div>
        </div>
    );
};
