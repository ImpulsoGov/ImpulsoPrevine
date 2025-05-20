import { getInternalCardsProps } from '@/helpers/cardsList';
import type { CardProps } from '@impulsogov/design-system/dist/molecules/Card/Card';
import { captureException } from '@sentry/nextjs';
import { Suspense } from 'react';
import { InternalCards } from './presentation';
import { internalCardsController } from '../../../../../../../../backend/internalCards/controller';
import { internalCardsDetails } from '../../../../PanelSelector.consts';

export const InternalCardsContainer = async({
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
        <InternalCards internalCardsProps={internalCardsProps} />
    </Suspense>
  )
}