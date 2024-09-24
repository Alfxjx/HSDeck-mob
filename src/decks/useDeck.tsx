import { encode as d_encode, decode as d_decode, DeckDefinition, FormatType } from "deckstrings";
import { CardData } from "hearthstonejson-client";

export interface IBaseDeckItem {
    cardData: CardData;
    count: number;
    dbfid: number;
}

export interface IDeckItem extends IBaseDeckItem {
    sideboardCards: IBaseDeckItem[];
}

export interface IDeck {
    cards: IDeckItem[];
    heroes: {
        heroData: CardData;
        dbfid: number;
    }[];
    format: FormatType;
}

export type availableLocales = 'enUS' | 'zhCN';

export function decode(deckString: string): DeckDefinition {
    const deck = d_decode(deckString);
    console.log(deck);
    return deck;
}

export function encode(deck: DeckDefinition): string {
    const deckString = d_encode(deck);
    return deckString;
}

export async function getLatestJSON(locale: availableLocales = 'zhCN'): Promise<CardData[]> {
    try {
        const response = await fetch(`/assets/cards/cards.${locale}.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('加载全部卡组信息失败:', error);
        throw error;
    }
}

export function mapDbfIdtoCard(dbfId: number, cards: CardData[]): CardData | undefined {
    const card = cards.find(card => card.dbfId === dbfId);
    return card;
}

export async function parseDeck(deckString: string, locale: availableLocales = 'enUS'): Promise<IDeck> {
    const allCards = await getLatestJSON(locale);

    const { cards, heroes, format, sideboardCards } = decode(deckString);

    let parsedCards = cards.map(card => {
        const cardData = mapDbfIdtoCard(card[0], allCards);
        if (!cardData) {
            throw new Error(`Card with dbfId ${card[0]} not found`);
        }
        return {
            cardData,
            dbfid: card[0],
            count: card[1],
            sideboardCards: [] as IBaseDeckItem[]
        }
    })
    const parsedHeroes = heroes.map(hero => {
        const heroData = mapDbfIdtoCard(hero, allCards);
        if (!heroData) {
            throw new Error(`Hero with dbfId ${hero} not found`);
        }
        return {
            heroData,
            dbfid: hero
        };
    });
    const parsedsideboardCards = sideboardCards ? sideboardCards?.map(card => {
        const [dbfId, count, sideboardOwnerDbfId] = card;
        const cardData = mapDbfIdtoCard(dbfId, allCards);
        const sideboardOwner = mapDbfIdtoCard(sideboardOwnerDbfId, allCards);
        if (!cardData) {
            throw new Error(`Card with dbfId ${dbfId} not found`);
        }
        if (!sideboardOwner) {
            throw new Error(`Sideboard owner with dbfId ${sideboardOwnerDbfId} not found`);
        }
        return {
            cardData,
            count,
            dbfid: dbfId,
            sideboardOwnerDbfId: sideboardOwnerDbfId,
            sideboardOwner
        }
    }) : [];

    // 将备牌 牛牛 奇利亚斯 从sideboardCards中移动到对应的sideboardOwner中
    parsedsideboardCards?.forEach(card => {
        const sideboardOwner = parsedCards.find(parsedCard => parsedCard.dbfid === card.sideboardOwnerDbfId);
        if (!sideboardOwner) {
            throw new Error(`Sideboard owner with dbfId ${card.sideboardOwnerDbfId} not found`);
        }
        if (!Object.prototype.hasOwnProperty.call(sideboardOwner, 'sideboardCards')) {
            sideboardOwner.sideboardCards = [] as IBaseDeckItem[];
        }
        sideboardOwner.sideboardCards.push({
            cardData: card.cardData,
            count: card.count,
            dbfid: card.dbfid
        });
    });

    parsedCards = parsedCards.map(parseZilliax).sort((a, b) => {
        return (a.cardData.cost ?? 0) - (b.cardData.cost ?? 0);
    });

    return {
        cards: parsedCards,
        heroes: parsedHeroes,
        format,
    }
}

/**
 * @description 处理下奇利亚斯
 * @param {IDeckItem} zilliax
 * @return {*}  {IDeckItem}
 */
function parseZilliax(zilliax: IDeckItem): IDeckItem {
    const ZILLIAX_DBFID = 102983;
    const ZILLIAX_ABSTRACT_SIDEBOARD_DBFID = 110446;

    if (zilliax.dbfid !== ZILLIAX_DBFID) {
        return zilliax;
    }
    const newZilliax: IDeckItem = {
        count: zilliax.count,
        dbfid: zilliax.dbfid,
        cardData: {
            ...zilliax.cardData,
            cost: zilliax.sideboardCards.reduce((acc, card) => acc + (card.cardData.cost ?? 0), 0)
        },
        sideboardCards: zilliax.sideboardCards.filter(card => card.dbfid !== ZILLIAX_ABSTRACT_SIDEBOARD_DBFID)
    };
    return newZilliax
}