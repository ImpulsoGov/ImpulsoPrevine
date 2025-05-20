"use client";
import { CardGrid } from '@impulsogov/design-system';
import type { CardProps } from '@impulsogov/design-system/dist/molecules/Card/Card';

export const InternalCards = ({internalCardsProps}:{internalCardsProps : CardProps[]}) => (
    <div style={{marginTop: '75px'}}>
        <CardGrid cards={internalCardsProps} />
    </div>
)
