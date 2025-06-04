import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";
import { captureException } from "@sentry/nextjs";
import { Suspense } from "react";
import * as Presentation from "./presentation";
import { internalCardsController } from "../../../../../../../../backend/internalCards/controller";
import { type CardDetailsMap, internalCardsDetails } from "../../../../consts";
import type { InternalCardDataItem } from "@/features/acf/diabetes/backend/model";

type InternalCardsProps = {
    municipalitySusId: string;
    teamIne: string;
};

const getInternalCardsProps = (
    details: CardDetailsMap,
    data: Array<InternalCardDataItem>
): Array<CardProps> => {
    return data.map<CardProps>((card) => {
        const cardDetails = details[card.healthIndicator];
        return {
            ...cardDetails,
            value: card.value.toString(),
        };
    });
};

export const InternalCardsCoeq: React.FC<InternalCardsProps> = async ({
    municipalitySusId,
    teamIne,
}) => {
    let internalCardsProps: Array<CardProps> = [];
    try {
        const internalCardsData = await internalCardsController(
            municipalitySusId,
            teamIne
        );
        internalCardsProps = getInternalCardsProps(
            internalCardsDetails,
            internalCardsData
        );
    } catch (error) {
        captureException(error);
    }
    return (
        <Suspense>
            <Presentation.InternalCards
                internalCardsProps={internalCardsProps}
            />
        </Suspense>
    );
};

export const InternalCardsCoaps: React.FC<InternalCardsProps> = async ({
    municipalitySusId,
}) => {
    let internalCardsProps: Array<CardProps> = [];
    try {
        const internalCardsData =
            await internalCardsController(municipalitySusId);
        internalCardsProps = getInternalCardsProps(
            internalCardsDetails,
            internalCardsData
        );
    } catch (error) {
        captureException(error);
    }
    return (
        <Suspense>
            <Presentation.InternalCards
                internalCardsProps={internalCardsProps}
            />
        </Suspense>
    );
};
