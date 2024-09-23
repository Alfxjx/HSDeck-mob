import { IBaseDeckItem, IDeckItem } from "@/decks/useDeck";

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

function getBgColorEnd(card: IBaseDeckItem) {
    const opacity = '99';
    switch (card.cardData.rarity) {
        case 'COMMON':
            return '#636363' + opacity;
        case 'RARE':
            return '#243e58' + opacity;
        case 'EPIC':
            return '#4b3961' + opacity;
        case 'LEGENDARY':
            return '#63441b' + opacity;
        default:
            return '#636363' + opacity;
    }
}

export function HsTile({ card }: { card: IDeckItem }) {
    return (
        // TODO这里渐变的样式有问题
        <div>
            <div
                style={{
                    backgroundImage: `linear-gradient(to right, ${getBgColor(card)} 40%, ${getBgColorEnd(card)} 65%) `,
                }}
                className="relative flex items-center justify-between w-[256px] h-[30px] text-sm"
            >
                <section className="flex items-center justify-between h-[30px]">
                    <p className="text-white w-6 text-center">{`${card.cardData.cost}`}</p>
                    <p className="text-white z-10">{`${card.cardData.name}`}</p>
                </section>
                <section
                    className="w-6 h-[30px] flex items-center justify-center"
                    style={{
                        backgroundColor: `${getBgColor(card)}`,
                    }}
                >
                    <p className="text-white">{`${card.count}`}</p>
                </section>
                <div
                    className="overflow-hidden absolute right-[-6px]">
                    <img
                        className="h-[30px] bg-no-repeat left-[30px] transform translate-x-[-30px]"
                        src={`${BASE_URL + card.cardData.id + SUFFIX}`}
                        alt={card.cardData.name}
                    />
                </div>



            </div>
            <div className='flex flex-col items-start ml-4'>
                {card.sideboardCards.map(sideboardCard => <HsSideboardTile key={sideboardCard.dbfid} sideboardCard={sideboardCard} />)}
            </div>
        </div>
    );
}

export function HsSideboardTile({ sideboardCard }: { sideboardCard: IBaseDeckItem }) {
    return (
        <div
            style={{
                backgroundImage: `linear-gradient(to right, ${getBgColor(sideboardCard)} 40%, ${getBgColorEnd(sideboardCard)} 65%) `,
            }}
            className="relative flex items-center justify-between w-[256px] h-[30px] text-sm"
        >
            <section className="flex items-center justify-between h-[30px]">
                <p className="text-white w-6 text-center">{`${sideboardCard.cardData.cost}`}</p>
                <p className="text-white z-10">{`${sideboardCard.cardData.name}`}</p>
            </section>
            <section
                className="w-6 h-[30px] flex items-center justify-center"
                style={{
                    backgroundColor: `${getBgColor(sideboardCard)}`,
                }}
            >
                <p className="text-white">{`${sideboardCard.count}`}</p>
            </section>
            <div
                className="overflow-hidden absolute right-[-6px]">
                <img
                    className="h-[30px] bg-no-repeat left-[30px] transform translate-x-[-30px]"
                    src={`${BASE_URL + sideboardCard.cardData.id + SUFFIX}`}
                    alt={sideboardCard.cardData.name}
                />
            </div>

        </div>
    );
}