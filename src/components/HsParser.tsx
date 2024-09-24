import { useState, useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "./ui/input";
import { decode } from "@/decks/useDeck"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    deckName: z.string().max(50, { message: '卡组名称长度不能超过50个字符' }),
    userName: z.string().max(50, { message: '用户名长度不能超过50个字符' }),
    deckCode: z.string().min(1, { message: '卡组代码不能为空' }),
})

export function HsParser({ onCodeSubmit }: {
    onCodeSubmit: (code: string, userName: string, deckName: string) => void,
}) {

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
            deckName: "",
            deckCode: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        const parsedDeckCode = values.deckCode.split('\n').filter(x => !x.startsWith('#'))[0];
        try {
            decode(parsedDeckCode);
            onCodeSubmit(
                encodeURIComponent(parsedDeckCode),
                encodeURIComponent(values.userName),
                encodeURIComponent(values.deckName)
            );
        } catch (error) {
            toast({
                variant: 'destructive',
                title: '解析失败',
                description: '请检查卡组代码是否正确',
            });
        }

    }

    const [rows, setRows] = useState(5);

    useEffect(() => {
        const updateRows = () => {
            const viewportHeight = window.innerHeight;
            const calculatedRows = Math.floor(viewportHeight / 50) - 3; // 50px per row as an example
            setRows(calculatedRows);
        };

        updateRows();
        window.addEventListener('resize', updateRows);

        return () => {
            window.removeEventListener('resize', updateRows);
        };
    }, []);

    const handleReset = () => {
        form.reset();
    }

    const handleSample = () => {
        form.setValue('deckCode', `AAECAc3wBga/9wWOlgbmqQb0yQbM4QaQ5gYMkp8E958E07IF2sMFuMUF6PoFyJQG7qkGtrUGlcoGk8sGpOEGAAA=`);
        form.setValue('deckName', `无敌大刀贼`);
        form.setValue('userName', `只解风情不解谜#5603`);

    }

    return (
        <div className="mx-6 mt-8 flex flex-col items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                    <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>作者</FormLabel>
                                <FormControl>
                                    <Input placeholder="Godgun" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="deckName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>卡组名称</FormLabel>
                                <FormControl>
                                    <Input placeholder="名字越长战斗力越高" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="deckCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>卡组代码</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="复制粘贴" rows={rows} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-y-2">
                        <Button type="submit" className="w-full">解析代码</Button>
                        <Button type="button" onClick={handleReset} variant={'outline'} className="w-full">重置</Button>
                        <Button type="button" onClick={handleSample} variant={'outline'} className="w-full">加载示例</Button>
                    </div>

                </form>
            </Form>

        </div>
    )
}