import externalCards from '../dataExternalCards.json';
import internalCards from '../dataInternalCards.json';
import { InvalidCardTypeError } from './errors';

export type CardType = 'external' | 'internal';

export type CardsData = {
  municipio_id_sus: string;
  equipe_ine: string;
  lista: string;
  descricao: string;
  valor: number;
}

export const VALID_CARD_TYPES = ['external', 'internal'];

export const DATA_BY_TYPE: Record<string, CardsData[]> = {
  external: externalCards,
  internal: internalCards,
}

/**
 * Validates the provided card type.
 *
 * @param type - The card type to validate
 * @throws {InvalidCardTypeError} If the card type is not 'external' or 'internal'
 *
 * @remarks
 * This function ensures that only valid card types are used in the application.
 */
export function validateCardType(type: CardType): void {
  if (!VALID_CARD_TYPES.includes(type)) {
    throw new InvalidCardTypeError('Tipo de card deve ser `external` ou `internal`');
  }
}

/**
 * Retrieves card data for a specific card type.
 *
 * @param type - The type of cards to retrieve, either 'external' or 'internal'
 * @returns An array of card data matching the specified type
 *
 * @throws {InvalidCardTypeError} If an invalid card type is provided
 */
export function getDataByType(type: CardType): CardsData[] {
  return DATA_BY_TYPE[type];
}
