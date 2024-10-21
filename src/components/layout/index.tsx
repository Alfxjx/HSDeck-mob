import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Bolt, Hash, LogOut, PencilRuler, Share2 } from "lucide-react";
import { Sidebar, SidebarBody, SidebarLink } from "../aceternity-ui/sidebar";
import { motion } from "framer-motion";
import avatarUrl from '@/assets/avatar.jpg'
import hearthUrl from '@/assets/hearth.png'

export function LayoutKit({ children }: { children: React.ReactNode }) {
    const links = [
        {
            label: "卡组解析器",
            href: "/code",
            icon: (
                <Hash />
            ),
        },
        {
            label: "在线卡组编辑器",
            href: "/editor",
            icon: (
                <PencilRuler />
            ),
        },
        {
            label: "设置",
            href: "#",
            icon: (
                <Bolt />
            ),
        },
        {
            label: "分享",
            href: "#",
            icon: (
                <Share2 />
            ),
        },
        {
            label: "登出",
            href: "#",
            icon: (
                <LogOut />
            ),
        },
    ];
    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-white dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "h-screen"
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                            {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    {/* 左下角头像 */}
                    <div>
                        <SidebarLink
                            link={{
                                label: "只解风情不解谜#5603",
                                href: "#",
                                icon: (
                                    <img
                                        src={avatarUrl}
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
            {children}
        </div>

    )
}

export const Logo = () => {
    return (
        <Link
            to="/"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <HSLOGO />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                HS.abandon.work
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            to="/"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <HSLOGO />
        </Link>
    );
};

const HSLOGO = () => {
    // return <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    return (
        <img src={hearthUrl} className="h-6 w-6" alt="" />
    )
}