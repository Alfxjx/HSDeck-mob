import { encode as d_encode, decode as d_decode, DeckDefinition } from "deckstrings";

export function decode(deckString: string): DeckDefinition {
    const deck = d_decode(deckString);
    return deck;
}

export function encode(deck: DeckDefinition): string {
   const deckString = d_encode(deck);
    return deckString;
}