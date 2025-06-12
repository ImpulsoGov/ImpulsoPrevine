import type { InternalCardDataItem } from "@/features/acf/diabetes/backend/model";
import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";
import { captureException } from "@sentry/nextjs";
import { Suspense } from "react";
import { internalCardsControllerCoeq } from "../../../../../../../../backend/internalCards/controller";
import { type CardDetailsMap, internalCardsDetails } from "../../../../consts";
import * as Presentation from "./presentation";

type CoeqInternalCardsProps = {
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

export const CoeqInternalCards: React.FC<CoeqInternalCardsProps> = async ({
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
