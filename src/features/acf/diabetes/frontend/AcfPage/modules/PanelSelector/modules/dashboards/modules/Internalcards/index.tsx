import { getInternalCardsProps } from '@/helpers/cardsList';
import type { CardProps } from '@impulsogov/design-system/dist/molecules/Card/Card';
import { captureException } from '@sentry/nextjs';
import { Suspense } from 'react';
import * as Presentation from './presentation';
import { internalCardsController } from '../../../../../../../../backend/internalCards/controller';
import { internalCardsDetails } from '../../../../consts';

export const InternalCards = async({
    municipalitySusId,
    teamIne,
}:{
    municipalitySusId: string;
    teamIne: string;
}) => {
    let internalCardsProps: Array<CardProps> = [];
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
        <Presentation.InternalCards internalCardsProps={internalCardsProps} />
    </Suspense>
  )
}