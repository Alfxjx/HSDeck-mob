import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea"

export function HsParser({ onCodeSubmit }: { onCodeSubmit: (code: string) => void }) {
    const [code, setCode] = useState<string>('');

    const handleClick = () => {
        onCodeSubmit(encodeURIComponent(code));
    }

    return (
        <div className="mx-2 flex flex-col items-center">
            <div className="w-full text-left">
                输入卡组代码：
            </div>
            <Textarea onChange={(e) => setCode(e.target.value)} />
            <Button className="w-full mt-2" onClick={handleClick}>解析代码</Button>
        </div>
    )
}