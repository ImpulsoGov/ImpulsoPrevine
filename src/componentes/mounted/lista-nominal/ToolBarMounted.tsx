import { ListToolBar, Tooltip, Tag, Icon, Text, SearchBarContainer, Input, Button,  } from '@impulsogov/design-system'
import { Dispatch, SetStateAction } from 'react';

interface InputProps {
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
}

interface ToolBarMountedProps {
    updateDate: string | null;
    print: () => void;
    inputProps: InputProps;
    handleSearchClick: () => void;
}

export const ToolBarMounted = ({
    updateDate,
    print,
    inputProps,
    handleSearchClick
}: ToolBarMountedProps) => {
    return (
        <ListToolBar>
            <>
                <Tooltip
                arrow
                title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor tristique urna, id fermentum neque fermentum vel. Ut libero ante, rhoncus id lorem varius, sagittis sollicitudin felis. Quisque sollicitudin ut nibh eu luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor tristique urna, id fermentum neque fermentum vel. Ut libero ante, rhoncus id lorem varius, sagittis sollicitudin felis. Quisque sollicitudin ut nibh eu luctus."
                >
                <Tag
                    type="info"
                    theme="normal"
                >
                    <Icon
                    alt="Ícone de círculo com um i no centro"
                    height={16}
                    src="https://media.graphassets.com/728VwDSRhpQWmvbN9nSA"
                    width={16}
                    />
                    <Text>
                    LISTA ATUALIZADA EM: {updateDate}
                    </Text>
                </Tag>
                </Tooltip>

                <SearchBarContainer>
                <Input
                    border="top-bottom-left"
                    placeholder="PESQUISE UM NOME"
                    shape="rounded-left"
                    value={inputProps.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputProps.onChange(e.target.value)}
                    aria-label="Campo de busca por nome"
                    role="searchbox"
                />
                <Button
                    border="full"
                    onClick={handleSearchClick}
                    shape="rounded-right"
                    theme="white"
                >
                    <Icon
                    alt="Ícone de uma lupa"
                    height={18}
                    src="https://media.graphassets.com/CnDbZuxgR7mVU87EmN2u"
                    width={20}
                    />
                </Button>
                </SearchBarContainer>

                <Button
                hasHover
                onClick={print}
                >
                <Icon
                    alt="Ícone de uma impressora"
                    height={16}
                    src="https://media.graphassets.com/3vsKrZXYT9CdxSSyhjhk"
                    width={16}
                />
                Imprimir lista
                </Button>
            </>
      </ListToolBar>
    )
}