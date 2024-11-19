import { getLatestCollectibleJSON, getLatestJSON } from "@/decks/useDeck"
import { useEffect, useState } from "react"
import EditableFileName from "./EditableFileName";

const BASE_URL = 'https://art.hearthstonejson.com/v1/256x/';

export function Editor() {

    const [deckName, setDeckName] = useState<string>('自定义套牌');
    const [, setCards] = useState<any[]>([]);
    const [heros, setHeros] = useState<any[]>([]);

    const handleSave = (newName: string) => {
        if (deckName !== newName) {
            setDeckName(newName);
        }
    };

    useEffect(() => {
        getLatestCollectibleJSON('zhCN').then(data => {
            setCards(data);
        })
        getLatestJSON('zhCN').then(data => {
            const _heros = data
                .filter(card => card.set === 'HERO_SKINS' && card.type === 'HERO' && card.rarity === 'FREE' && /\bHERO_\d{2}\b/.test(card.id ?? ''))
                .map(card => {
                    const heropower = data.find(_card => _card.dbfId === card.heroPowerDbfId);
                    return {
                        ...card,
                        heropower
                    }
                });
            setHeros(_heros);
        })
    }, [])

    return (
        <div className="w-full h-screen overflow-hidden flex flex-col items-center justify-start">
            <div className="flex items-center flex-shrink-0 flex-grow-0 w-full bg-gray-100 px-2 pb-4">
                <EditableFileName initialName={deckName} onSave={handleSave} />
            </div>
            <div className="flex flex-col flex-1 bg-slate-100 w-full ">
                {/* 职业 */}
                <div className="overflow-x-scroll flex space-x-1 shadow px-2 py-1">
                    <div className="w-12 h-12 rounded-full bg-indigo-500 text-gray-200 flex justify-center items-center flex-shrink-0">
                        中立
                    </div>
                    {
                        heros.map(hero => {
                            return (
                                <div key={hero.dbfId} className="w-12 h-12 flex-shrink-0">
                                    <img src={`${BASE_URL}${hero.heropower.id}.webp`} alt={hero.name} className="rounded-full" />
                                </div>
                            )
                        })
                    }

                </div>
                {/* {
                    cards.map(card => {
                        return (
                            <div key={card.dbfId} className="w-1/4 h-1/4 bg-white">
                                <img src={card.image} alt={card.name} />
                            </div>
                        )
                    })
                } */}
            </div>
        </div>
    )
}