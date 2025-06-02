"use client";
import {
    SearchBarContainer,
    Input,
    Button,
    Icon,
} from "@impulsogov/design-system";
import { useState, useContext } from "react";
import { SearchContext, type SearchModel } from "../../WithSearch/context";

export const SearchBar: React.FC = () => {
    const [value, setValue] = useState<string>("");
    const { onSearchChange } = useContext<SearchModel>(SearchContext);

    return (
        <SearchBarContainer>
            <Input
                border="top-bottom-left"
                placeholder="PESQUISE UM NOME"
                shape="rounded-left"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(e.target.value);
                }}
                aria-label="Campo de busca por nome"
                role="searchbox"
            />
            <Button
                border="full"
                onClick={() => {
                    onSearchChange(value);
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
