import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";
import { captureException } from "@sentry/nextjs";
import { Suspense } from "react";
import * as Presentation from "./presentation";
import {
    internalCardsControllerCoaps,
    internalCardsControllerCoeq,
} from "../../../../../../../../backend/internalCards/controller";
import { type CardDetailsMap, internalCardsDetails } from "../../../../consts";
import type { InternalCardDataItem } from "@/features/acf/diabetes/backend/model";

type InternalCardsCoeqProps = {
    municipalitySusId: string;
    teamIne: string;
};

type InternalCardsCoapsProps = {
    municipalitySusId: string;
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

export const InternalCardsCoeq: React.FC<InternalCardsCoeqProps> = async ({
    municipalitySusId,
    teamIne,
}) => {
    let internalCardsProps: Array<CardProps> = [];
    try {
        const internalCardsData = await internalCardsControllerCoeq(
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

export const InternalCardsCoaps: React.FC<InternalCardsCoapsProps> = async ({
    municipalitySusId,
}) => {
    let internalCardsProps: Array<CardProps> = [];
    try {
        const internalCardsData =
            await internalCardsControllerCoaps(municipalitySusId);
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
