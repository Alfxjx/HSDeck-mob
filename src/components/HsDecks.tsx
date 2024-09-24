import { IDeck, IDeckItem } from "../decks/useDeck";
import { HsTile } from './HsTile';

export const HsDecks = ({ deckObj }: { deckObj: IDeck }) => {

    const splitArray = (array: IDeckItem[]) => {
        const deckLen = array.length + array.reduce((acc, card) => acc + card.sideboardCards.length, 0);
        const middleIndex = Math.ceil(deckLen / 2);
        const firstHalf = array.slice(0, middleIndex);
        const secondHalf = array.slice(middleIndex);
        return [firstHalf, secondHalf];
    };

    const [firstHalf, secondHalf] = deckObj ? splitArray(deckObj.cards) : [[], []];

    return (
        <div className='py-2'>
            <div className='flex flex-col items-center'>
                <div className="flex">
                    <div className='flex flex-col items-start'>
                        {firstHalf.map(card => {
                            return (
                                <HsTile card={card} key={card.dbfid} />
                            )
                        })}
                    </div>
                    <div className='flex flex-col items-start'>
                        {secondHalf.map(card => {
                            return (
                                <HsTile card={card} key={card.dbfid} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}