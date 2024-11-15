import { HsParser } from "@/components/HsParser";
import { useNavigate } from "react-router-dom";

export function CodeV2Input() {
    const navigate = useNavigate();
    function handleCode(code: string, userName: string, deckName: string) {
        const queryParams = new URLSearchParams({ code, userName, deckName }).toString();
        navigate(`/code/result?${queryParams}`);
    }

    return (
        <div className='flex flex-col items-center min-h-screen w-screen pt-4'>
            <div className='font-semibold text-lg'>卡组解析器</div>
            <div className='flex-1 w-full'>
                <HsParser onCodeSubmit={handleCode} />
            </div>
        </div>
    )
}