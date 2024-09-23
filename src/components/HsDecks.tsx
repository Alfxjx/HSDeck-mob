import {highlanderMageDeck, bigSpellMageDeck} from '../decks/index';
import { encode, decode } from "../decks/useDeck";

export const HsDecks = () => {
    return (
        <div>
            <h1>Hearthstone Decks</h1>
            <p>
                This is a simple example of using the Hearthstone Decks API.
            </p>
            <h2>Highlander Mage Deck</h2>
            <p>
                {highlanderMageDeck}
            </p>
            <p>{JSON.stringify(decode(highlanderMageDeck))}</p>
            <h2>Big Spell Mage Deck</h2>
            <p>
                {bigSpellMageDeck}
            </p>
            <p>{JSON.stringify(decode(bigSpellMageDeck))}</p>
        </div>
    );
}