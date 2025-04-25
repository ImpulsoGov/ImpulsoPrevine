import { getInternalCardsProps } from '@/helpers/cardsList';
import type { CardProps } from '@impulsogov/design-system/dist/molecules/Card/Card';
import { captureException } from '@sentry/nextjs';
import { Suspense } from 'react';
import { internalCardsDetails } from '../../../../../PanelSelector.consts';
import { CardsGridInternal } from './CardsGridInternal';
import { internalCardsController } from './internalCards.controller';

export const InternalCards = async({
    municipalitySusId,
    teamIne,
}:{
    municipalitySusId: string;
    teamIne: string;
}) => {
    let internalCardsProps: CardProps[] = [];
    try {
        const internalCardsData = await internalCardsController(
            municipalitySusId,
            teamIne,
        );
        internalCardsProps = getInternalCardsProps(internalCardsDetails, internalCardsData);
    } catch (error) {
        captureException(error);
    }
  return (
    <Suspense>
        <CardsGridInternal internalCardsProps={internalCardsProps} />
    </Suspense>
  )
}