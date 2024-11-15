import { IDeck } from "@/decks/useDeck";
import { HsDecks } from "@/components/HsDecks";
import { HSQrcode, HSInfo } from "@/components/HsShare";
import { parseHero, parseFormat } from "@/lib/utils";

export function SharePanel(props: { deckObj: IDeck, code: string, deckName: string, userName: string }) {
    const { deckObj, code, deckName, userName } = props;
    function checkDeckLen(deckObj: IDeck) {
        return deckObj.cards.length > 30 ? 40 : 30;
    }
    return (
        <div className="container flex flex-row w-[50vw] max-h-[500px] p-2 space-y-1" id="swapy">
            <div className="flex-1" data-swapy-slot="1">
                <HsDecks deckObj={deckObj} deckOptions={{ cols: checkDeckLen(deckObj) === 30 ? 1 : 2 }} />
            </div>
            <div className="flex-1 flex-col items-center h-full">
                <div className="flex-1 h-1/2" data-swapy-slot="2">
                    <HSQrcode
                        deckString={decodeURIComponent(code)}
                        deckName={deckName ? decodeURIComponent(deckName) : ''}
                        userName={userName ? decodeURIComponent(userName) : ''}
                        hero={parseHero(deckObj?.heroes[0].heroData.cardClass)}
                        format={parseFormat(deckObj?.format)}
                    />
                </div>
                <div className="flex-1" data-swapy-slot="3">
                    <HSInfo
                        deckString={decodeURIComponent(code)}
                        deckName={deckName ? decodeURIComponent(deckName) : ''}
                        userName={userName ? decodeURIComponent(userName) : ''}
                        hero={parseHero(deckObj?.heroes[0].heroData.cardClass)}
                        format={parseFormat(deckObj?.format)}
                    />
                </div>
            </div>
        </div>
    )
}