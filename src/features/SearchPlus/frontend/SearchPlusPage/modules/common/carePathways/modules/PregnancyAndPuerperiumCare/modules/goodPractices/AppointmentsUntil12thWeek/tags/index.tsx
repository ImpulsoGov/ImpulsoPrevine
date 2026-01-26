import type { Status } from "../logic/AppointmentsUntil12thWeekCalculator";
import { PrintTag } from "@/features/common/frontend/molecules";
import { Icon, Text } from "@/features/common/frontend/atoms";

export const Tag: React.FC<{ content: Status }> = ({ content }) => {
    if (content === 0) {
        return (
            <PrintTag theme="disabled">
                <Icon
                    loading="eager"
                    src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmhnoilrs2vlh07keu437gdcq"
                    alt="Ícone de um x dentro de um círculo"
                    width={8}
                    height={8}
                />
                <Text>0/1</Text>
            </PrintTag>
        );
    }

    return (
        <PrintTag theme="success">
            <Icon
                loading="eager"
                src="https://sa-east-1.graphassets.com/AH0lIsPT8QrCidoSKZ1cPz/cmecx3h8q006007lpwtiggqe3"
                alt="Ícone de uma marca de verificação verde"
                width={8}
                height={8}
            />
            <Text>1/1</Text>
        </PrintTag>
    );
};
