import { IBaseDeckItem, IDeckItem } from "@/decks/useDeck";
import { CornerRightDown } from "lucide-react";

interface IBaseTileProps {
    color: string,
    count: number,
    cost: number,
    name: string,
    bgUrl: string,
    hasSideboards: boolean
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

function BaseTile({ color, count, cost, name, bgUrl, hasSideboards }: IBaseTileProps) {
    return (
        <div className='flex justify-start items-center text-gray-200 text-xs font-sans'
            style={{
                textShadow: '1px 1px 2px #666'
            }}

        >
            <div
                className='relative min-w-[150px] h-[24px] flex items-center justify-start text-ellipsis'
            >
                <div className='flex justify-start items-center w-full h-[24px] z-10'
                    style={{
                        background: `linear-gradient(90deg, ${color} 0, ${color} 55%, #0000)`
                    }}
                >
                    <p className='h-[24px] w-[30px] flex justify-center items-center'>{cost}</p>
                    <p className='w-[120px] text-nowrap text-ellipsis overflow-hidden'>{name}</p>
                </div>
                <div className="overflow-hidden absolute right-[-30px]">
                    <img
                        className="h-[24px] bg-no-repeat left-[30px] transform translate-x-[-30px]"
                        src={bgUrl} alt={name} />
                </div>
            </div>
            <p
                className='h-[24px] w-[30px] leading-none flex justify-center items-center'
                style={{
                    background: color
                }}
            >
                {hasSideboards ? <CornerRightDown size={14} /> : count}
            </p>
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
            <BaseTile color={color} count={count} cost={cost ?? 0} name={name ?? '-'} bgUrl={bgUrl} hasSideboards={card.sideboardCards.length > 0} />
            <div className='flex flex-col items-start' >
                {
                    card.sideboardCards.map(sideboardCard => {
                        const { cardData, count, dbfid } = sideboardCard;
                        const { name, cost, id } = cardData;
                        const bgUrl = `${BASE_URL + id + SUFFIX}`;
                        const color = getBgColor(sideboardCard);
                        return (
                            <BaseTile color={color} count={count} cost={cost ?? 0} name={name ?? '-'} bgUrl={bgUrl} key={dbfid} hasSideboards={false} />
                        );
                    })
                }
            </div >
        </div >
    );
}

