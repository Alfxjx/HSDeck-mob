import { useEffect, useState } from 'react';
import { IDeck, parseDeck } from "../decks/useDeck";
import { HsTile } from './HsTile';

export const HsDecks = ({deckString} : {deckString: string}) => {

    const [deckObj, setDeckObj] = useState<IDeck>();

    useEffect(() => {
        async function getDeck() {
            const deck = await parseDeck(deckString, 'zhCN');
            setDeckObj(deck);
        }
        getDeck();
    }, [deckString])

    return (
        <div className='py-2'>
            <div className='flex flex-col items-center'>
                <div className='flex flex-col items-start'>
                    {deckObj?.cards.map(card => {
                        return (
                            <HsTile card={card} key={card.dbfid} />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}