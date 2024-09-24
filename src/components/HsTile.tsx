import { IBaseDeckItem, IDeckItem } from "@/decks/useDeck";

interface IBaseTileProps {
    color: string,
    count: number,
    cost: number,
    name: string,
    bgUrl: string
}

const BASE_URL = 'https://art.hearthstonejson.com/v1/tiles/';
const SUFFIX = '.webp';

function getBgColor(card: IBaseDeckItem) {
    switch (card.cardData.rarity) {
        case 'COMMON':
            return '#636363';
        case 'RARE':
            return '#243e58';
        case 'EPIC':
            return '#4b3961';
        case 'LEGENDARY':
            return '#63441b';
        default:
            return '#636363';
    }
}

function BaseTile({ color, count, cost, name, bgUrl }: IBaseTileProps) {
    return (
        <div className='flex justify-start items-center text-white text-sm font-sans'
            style={{
                textShadow: '1px 1px 2px #000'
            }}

        >
            <div
                className='relative min-w-[200px] h-[30px] flex items-center justify-start text-ellipsis'
            >
                <div className='flex justify-start items-center w-full h-[30px] z-10'
                    style={{
                        background: `linear-gradient(90deg, ${color} 0, ${color} 55%, #0000)`
                    }}
                >
                    <p className='h-[30px] w-[30px] flex justify-center items-center'>{cost}</p>
                    <p className='text-nowrap text-ellipsis overflow-hidden'>{name}</p>
                </div>
                <div className="overflow-hidden absolute right-[-30px]">
                    <img
                        className="h-[30px] bg-no-repeat left-[30px] transform translate-x-[-30px]"
                        src={bgUrl} alt={name} />
                </div>
            </div>
            <p
                className='h-[30px] w-[30px] leading-none flex justify-center items-center'
                style={{
                    background: color
                }}
            >{count}</p>
        </div>
    );
}

export function HsTile({ card }: { card: IDeckItem }) {
    const { cardData, count } = card;
    const { name, cost, id } = cardData;
    const bgUrl = `${BASE_URL + id + SUFFIX}`;
    const color = getBgColor(card);
    return (
        <div>
            <BaseTile color={color} count={count} cost={cost ?? 0} name={name ?? '-'} bgUrl={bgUrl} />
            <div className='flex flex-col items-start ml-4'>
                {card.sideboardCards.map(sideboardCard => {
                    const { cardData, count, dbfid } = sideboardCard;
                    const { name, cost, id } = cardData;
                    const bgUrl = `${BASE_URL + id + SUFFIX}`;
                    const color = getBgColor(sideboardCard);
                    return (
                        <BaseTile color={color} count={count} cost={cost ?? 0} name={name ?? '-'} bgUrl={bgUrl} key={dbfid} />
                    );
                })}
            </div>
        </div>
    );
}

