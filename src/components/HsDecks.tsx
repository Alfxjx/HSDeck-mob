import { IDeck, IDeckItem, IDeckOptions } from "../decks/useDeck";
import { HsTile } from './HsTile';

const defaultProps: IDeckOptions = { cols: 1 };

export const HsDecks = ({ deckObj, deckOptions = defaultProps }: { deckObj: IDeck, deckOptions?: IDeckOptions }) => {
    const { cols } = deckOptions || defaultProps;

    const splitArray = (array: IDeckItem[]) => {
        const deckLen = array.length + array.reduce((acc, card) => acc + card.sideboardCards.length, 0);
        const middleIndex = Math.ceil(deckLen / 2);
        const firstHalf = array.slice(0, middleIndex);
        const secondHalf = array.slice(middleIndex);
        return [firstHalf, secondHalf];
    };

    const [firstHalf, secondHalf] = deckObj ? splitArray(deckObj.cards) : [[], []];

    const DeckPresenter = ({ cols }: { cols: 1 | 2 | undefined }) => {
        if (cols === 1) {
            return (
                <div className='flex flex-col items-start'>
                    {deckObj.cards.map(card => {
                        return (
                            <HsTile card={card} key={card.dbfid} />
                        )
                    })}
                </div>
            )
        }
        return (
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
        )
    }

    return (
        <div className='py-2'>
            <div className='flex flex-col items-center'>
                <div className="flex">
                    <DeckPresenter cols={cols} />
                </div>
            </div>
        </div>
    );
}