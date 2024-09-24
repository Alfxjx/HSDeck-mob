import { Copy, Lightbulb, Share2 } from 'lucide-react'
import './App.css'

import { HsDecks } from './components/HsDecks'
import { Button } from "@/components/ui/button"

import { useSearchParams } from 'react-router-dom';
import { HsParser } from './components/HsParser';
import { useEffect } from 'react';
import ClipboardJS from 'clipboard'
import { useToast } from "@/hooks/use-toast"
import { HsShare } from './components/HsShare';

function App() {

  const { toast } = useToast()

  const [searchParams, setSearchParams] = useSearchParams();

  const code = searchParams.get('code');
  const userName = searchParams.get('userName');
  const deckName = searchParams.get('deckName');


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
    <div className='flex flex-col items-center h-screen w-screen overflow-hidden'>

      <div className='flex-0 actions flex justify-around items-center py-2 sticky top-0 w-full bg-slate-200 z-20'>
        炉石卡牌分享 {process.env.VERSION}
      </div>

      <div className='flex-1 overflow-y-scroll w-full'>
        {!code && (
          <HsParser onCodeSubmit={handleCode} />
        )}
        {code && (
          <div className='flex justify-around items-start space-x-1 mx-2'>
            <HsDecks deckString={decodeURIComponent(code)} />
            <HsShare
              deckString={decodeURIComponent(code)}
              deckName={deckName ? decodeURIComponent(deckName) : ''}
              userName={userName ? decodeURIComponent(userName) : ''}
            />
          </div>
        )}

      </div>

      {
        code && (
          <div className='flex-0 actions flex justify-around items-center py-2 sticky bottom-0 w-full bg-white z-20'>
            <Button className='' id='share-btn' data-clipboard-action="copy" data-clipboard-text={decodeURIComponent(code)}>
              <Copy size={14} className='mr-2' />复制代码
            </Button>
            <Button className='' variant={'outline'}>
              <Share2 size={14} className='mr-2' />图片分享
            </Button>
            <Button className='' variant={'outline'} onClick={handleCreate}>
              <Lightbulb size={14} className='mr-2' />创建
            </Button>
          </div>
        )
      }
    </div>
  )
}

export default App
