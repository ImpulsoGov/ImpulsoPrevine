import Image from "next/image";

export const PageHeader: React.FC = () => {
    return (
        <div
            style={{
                padding: "20px",
                fontSize: "48px",
                fontWeight: "bold",
                textAlign: "center",
            }}
        >
            <span>
                <Image
                    src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmh9861jj03hp07kc08jyagdz"
                    alt="Busca+Mais Logo"
                    width={56}
                    height={28}
                />
            </span>{" "}
            Busca+Mais
        </div>
    );
};
