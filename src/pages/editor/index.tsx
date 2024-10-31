import { getLatestCollectibleJSON, getLatestJSON } from "@/decks/useDeck"
import { useEffect, useState } from "react"

const BASE_URL = 'https://art.hearthstonejson.com/v1/256x/';

export function Editor() {

    const [cards, setCards] = useState<any[]>([]);
    const [heros, setHeros] = useState<any[]>([]);

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
            console.log(_heros);
            setHeros(_heros);
        })
    }, [])

    return (
        <div className="w-full h-screen overflow-hidden flex flex-col items-center justify-start">
            <div className="flex flex-shrink-0 flex-grow-0 h-[200px] w-full bg-gray-100">已选择的卡</div>
            <div className="flex flex-col flex-1 bg-slate-100 w-full">
                <div className="flex flex-wrap">
                    {
                        heros.map(hero => {
                            return (
                                <div key={hero.dbfId} className="w-1/6 h-1/6">
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