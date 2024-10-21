import { useEffect, useState } from 'react';
import ClipboardJS from 'clipboard'
import { useSearchParams } from 'react-router-dom';
import { Copy, Github, Lightbulb } from 'lucide-react'

import { HsDecks } from '@/components/HsDecks'
import { Button } from "@/components/ui/button"
import { HsParser } from '@/components/HsParser';
import { useToast } from "@/hooks/use-toast"
import { HsShare } from '@/components/HsShare';

import { IDeck, parseDeck } from '@/decks/useDeck';
import { isWeixinBrowser, parseFormat, parseHero } from '@/lib/utils';

export function Code() {
    const { toast } = useToast()

    const [searchParams, setSearchParams] = useSearchParams();

    const code = searchParams.get('code');
    const userName = searchParams.get('userName');
    const deckName = searchParams.get('deckName');

    const [deckObj, setDeckObj] = useState<IDeck>();

    useEffect(() => {
        async function getDeck(code: string) {
            const deck = await parseDeck(decodeURIComponent(code), 'zhCN');
            setDeckObj(deck);

        }
        code && getDeck(code);
    }, [code])


    function handleCode(code: string, userName: string, deckName: string) {
        setSearchParams({ code, userName, deckName });
    }

    useEffect(() => {
        const clipboard = new ClipboardJS('#share-btn');

        clipboard.on('success', function (e) {
            toast({
                title: "复制成功",
                description: "卡组代码已复制到剪贴板",
            })
            e.clearSelection();
        });

        clipboard.on('error', function () {
            console.error('复制失败')
        });

    }, [toast]);

    function handleCreate() {
        setSearchParams({ code: '' });
    }

    return (
        <div className='flex flex-col items-center min-h-screen w-screen pt-4'>
            <div className='font-semibold text-lg'>卡组解析器</div>
            <div className='flex-1 w-full'>
                {!code && (
                    <HsParser onCodeSubmit={handleCode} />
                )}
                {code && (
                    <div id='share-anchor' className='flex flex-col justify-around items-center space-x-1 mx-2'>
                        {deckObj && <HsDecks deckObj={deckObj} />}
                        {deckObj && <HsShare
                            deckString={decodeURIComponent(code)}
                            deckName={deckName ? decodeURIComponent(deckName) : ''}
                            userName={userName ? decodeURIComponent(userName) : ''}
                            hero={parseHero(deckObj?.heroes[0].heroData.cardClass)}
                            format={parseFormat(deckObj?.format)}
                        />}
                    </div>
                )}

            </div>

            {
                code && (
                    <div className='flex-0 actions flex justify-start items-start sticky bottom-0 w-full bg-slate-300 z-20'
                        style={{
                            paddingBottom: isWeixinBrowser() ? '34px' : '0'
                        }}
                    >
                        <div className='flex-1 bg-slate-300 h-[36px] flex justify-start items-center'>
                            <a href='https://github.com/alfxjx' target='_blank' rel='noreferrer' className='pl-4 pr-2'><Github size={16} /></a>
                            <span className='text-sm text-blue-600 ml-2'>v{process.env.VERSION}</span>
                        </div>
                        <div className="flex flex-0 justify-end items-center">
                            <Button className='rounded-none' id='share-btn' data-clipboard-action="copy" data-clipboard-text={decodeURIComponent(code)} variant={'outline'}>
                                <Copy size={14} className='mr-2' />复制套牌
                            </Button>
                            <Button className='rounded-none' onClick={handleCreate}>
                                <Lightbulb size={14} className='mr-2' />创建套牌
                            </Button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}