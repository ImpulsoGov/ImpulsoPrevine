"use client";
import {
    Button,
    Icon,
    Input,
    SearchBarContainer,
} from "@impulsogov/design-system";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

type Props = {
    onSearchTriggered: Dispatch<SetStateAction<string>>;
};

export const SearchBar: React.FC<Props> = ({ onSearchTriggered }) => {
    const [value, setValue] = useState<string>("");

    return (
        <SearchBarContainer>
            <Input
                border="top-bottom-left"
                placeholder="Pesquise um nome"
                shape="rounded-left"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(e.target.value);
                }}
                onKeyDown={(e: { key: string }) => {
                    if (e.key === "Enter") onSearchTriggered(value);
                }}
                aria-label="Campo de busca por nome"
                role="searchbox"
            />
            <Button
                border="full"
                onClick={() => {
                    onSearchTriggered(value);
                }}
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
    );
};
