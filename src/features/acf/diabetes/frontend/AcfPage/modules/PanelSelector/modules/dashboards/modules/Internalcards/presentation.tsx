"use client";
import { CardGrid } from '@impulsogov/design-system';
import type { CardProps } from '@impulsogov/design-system/dist/molecules/Card/Card';

type InternalCardsProps = {
    internalCardsProps: Array<CardProps>;
};

export const InternalCards: React.FC<InternalCardsProps> = ({internalCardsProps}) => (
    <div style={{marginTop: '75px'}}>
        <CardGrid cards={internalCardsProps} />
    </div>
)
