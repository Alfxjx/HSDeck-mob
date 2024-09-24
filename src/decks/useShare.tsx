// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import domtoimage from 'dom-to-image-more';
import FileSaver from 'file-saver';
import html2canvas from 'html2canvas';

export function getShareImg(id: string, deckName: string, userName: string): void {
    const node = document.getElementById(id);

    domtoimage
        .toBlob(node)
        .then(function (dataUrl: string) {
            FileSaver.saveAs(dataUrl, `${deckName}-${userName}.png`);
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch(function (error: any) {
            console.error('oops, something went wrong!', error);
        });
}

export function getShareByCanvas(id: string, deckName: string, userName: string): void {
    const node = document.getElementById(id);
    const fileName = `${deckName}-${userName}.png`;
    if (!node) {
        return;
    }
    html2canvas(node, {
        useCORS: true,
    }).then((canvas) => {
        canvas.toBlob((blob) => {
            if (blob) {
                FileSaver.saveAs(blob, fileName);
            }
        });
    });
}