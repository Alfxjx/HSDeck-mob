import { QRCodeSVG } from 'qrcode.react';

interface IShareProps {
    deckString: string;
    deckName?: string;
    userName?: string;
}

export function HsShare({ deckString, deckName, userName }: IShareProps) {
    const url = `${window.location.protocol}://${window.location.host}/?code=${encodeURIComponent(deckString)}`;
    return (
        <div className='flex flex-col items-start space-y-1 mt-2 text-sm font-bold text-gray-900'>
            {deckName && <p>{deckName}</p>}
            {userName && <p>作者：{userName}</p>}
            <QRCodeSVG value={url} />
        </div>
    )
}