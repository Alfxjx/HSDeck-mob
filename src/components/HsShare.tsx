import moment from 'moment';
import { QRCodeSVG } from 'qrcode.react';

interface IShareProps {
    deckString: string;
    hero: string;
    format: string;
    deckName?: string;
    userName?: string;
}

export function HsShare({ deckString, deckName, userName, format, hero }: IShareProps) {
    const url = `${window.location.protocol}//${window.location.host}/?code=${encodeURIComponent(deckString)}&deckName=${encodeURIComponent(deckName ? deckName : '自定义套牌')}&userName=${encodeURIComponent(userName ? userName : '匿名')}`;
    return (
        <div className='w-[90%] flex items-start justify-center space-x-4 mt-2 text-sm font-bold text-gray-700'>
            <div className='flex-0 flex-grow-0'>
                <QRCodeSVG value={url} />
            </div>
            <div className="flex-1 flex-grow-1">
                <p className='max-w-[200px] text-ellipsis overflow-hidden text-nowrap'>卡组：{deckName ? deckName : '自定义套牌'}</p>
                <p className='max-w-[200px] text-ellipsis overflow-hidden text-nowrap'>作者： {userName ? userName : '匿名'} </p>
                <p className='max-w-[200px] text-ellipsis overflow-hidden text-nowrap'>类型： {hero + '@' + format} </p>
                <p className='max-w-[200px] text-ellipsis overflow-hidden text-nowrap'>日期： {moment().format('YYYY-MM-DD')} </p>
            </div>

        </div>
    )
}

export function HSQrcode({ deckString, deckName, userName }: IShareProps) {
    const url = `${window.location.protocol}//${window.location.host}/?code=${encodeURIComponent(deckString)}&deckName=${encodeURIComponent(deckName ? deckName : '自定义套牌')}&userName=${encodeURIComponent(userName ? userName : '匿名')}`;
    return <div className='flex justify-center'>
        <QRCodeSVG value={url} />
    </div>
}

export function HSInfo({ deckName, userName, format, hero }: IShareProps) {
    return (
        <div className="text-sm font-bold text-gray-700">
            <p className='max-w-[200px] text-ellipsis overflow-hidden text-nowrap'>卡组：{deckName ? deckName : '自定义套牌'}</p>
            <p className='max-w-[200px] text-ellipsis overflow-hidden text-nowrap'>作者： {userName ? userName : '匿名'} </p>
            <p className='max-w-[200px] text-ellipsis overflow-hidden text-nowrap'>类型： {hero + '@' + format} </p>
            <p className='max-w-[200px] text-ellipsis overflow-hidden text-nowrap'>日期： {moment().format('YYYY-MM-DD')} </p>
        </div>
    )
}