import { Tooltip, Tag, Icon, Text } from "@impulsogov/design-system";

export const LastUpdatedCard: React.FC = () => {
    // TODO: fazer controller para pegar a data de atualização real
    const updateDate = new Date("2023-10-01T12:00:00Z"); // data de exemplo, substitua pela data real que vai vir de um serviço
    return (
        <Tooltip
            arrow
            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor tristique urna, id fermentum neque fermentum vel. Ut libero ante, rhoncus id lorem varius, sagittis sollicitudin felis. Quisque sollicitudin ut nibh eu luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor tristique urna, id fermentum neque fermentum vel. Ut libero ante, rhoncus id lorem varius, sagittis sollicitudin felis. Quisque sollicitudin ut nibh eu luctus."
        >
            <Tag type="info" theme="normal">
                <Icon
                    alt="Ícone de círculo com um i no centro"
                    height={16}
                    src="https://media.graphassets.com/728VwDSRhpQWmvbN9nSA"
                    width={16}
                />
                <Text>
                    LISTA ATUALIZADA EM:{" "}
                    {/* {updateDate?.toLocaleDateString() ?? "-"} */}
                    {updateDate.toLocaleDateString()}
                </Text>
            </Tag>
        </Tooltip>
    );
};
