import { Copy, Share2 } from 'lucide-react'
import './App.css'

import { HsDecks } from './components/HsDecks'
import { Button } from "@/components/ui/button"

import { useSearchParams } from 'react-router-dom';
import { HsParser } from './components/HsParser';
import { useEffect } from 'react';
import ClipboardJS from 'clipboard'

function App() {

  const [searchParams, setSearchParams] = useSearchParams();

  const code = searchParams.get('code');

  function handleCode(code: string) {
    console.log(code);
    setSearchParams({ code });
  }

  useEffect(() => {
    const clipboard = new ClipboardJS('#share-btn');

    clipboard.on('success', function (e) {
      console.info('复制成功');
      e.clearSelection();
    });

    clipboard.on('error', function () {
      console.error('复制失败')
    });

  }, [])

  return (
    <div className='flex flex-col items-center h-screen w-screen overflow-hidden'>

      <div className='flex-0 actions flex justify-around items-center py-2 sticky top-0 w-full bg-slate-200 z-20'>
        炉石组牌器【1】
      </div>

      <div className='flex-1 overflow-y-scroll w-full'>
        {!code && (
          <HsParser onCodeSubmit={handleCode} />
        )}
        {code && <HsDecks deckString={decodeURIComponent(code)} />}

      </div>

      {
        code && (
          <div className='flex-0 actions flex justify-around items-center py-2 sticky bottom-0 w-full bg-white z-20'>
            <Button className='w-1/3 my-1' id='share-btn' data-clipboard-action="copy" data-clipboard-text={decodeURIComponent(code)}>
              <Copy size={14} className='mr-2' />复制代码
            </Button>
            <Button className='w-1/3' variant={'outline'}>
              <Share2 size={14} className='mr-2' />图片分享
            </Button>
          </div>
        )
      }
    </div>
  )
}

export default App
