"use client"
import { CircleCheck, EllipsisVertical, FileText, Info, Plus } from "lucide-react"
import { COLORS, PageCardProps } from "../lib/constants";
import React from "react";

export default function PageCard({ pageType, focused, onClick }: PageCardProps) {
    const iconColor = () => {
        return focused ? COLORS.focusYellow : COLORS.iconGray
    }

    const getIconByType = () => {
        if (pageType === "Ending") {
            return <CircleCheck color={iconColor()} size={20} />
        } else if (pageType === "Info") {
            return <Info color={iconColor()} size={20} />
        } else if (pageType === "Add Page") {
            return <Plus color="black" size={20} />
        } else {
            return <FileText color={iconColor()} size={20} />
        }
    }

    const getTextColor = () => {
        return focused ? "text-focus" : "text-unfocus"
    }

    const getBgColor = () => {
        return focused ? "bg-white" : "bg-unfocus-bg"
    }

    const onMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
    }

    return (
        <div className={`
            height-[32px]
            flex flex-row justify-center items-center
            ${getTextColor()}
            py-[4px] px-[10px]
            border-[0.5] border-page-border rounded-md
            ${getBgColor()}
            hover:${!focused ? "bg-hover" : "bg-unfocus-bg"}
            hover: ${!focused || pageType === "Add Page" ? "cursor-pointer" : "cursor-move"}`
        }
            onClick={onClick}
        >
            <div className="mr-2">{getIconByType()}</div>
            <div>{pageType}</div>
            {focused &&
                <div
                    className="ml-1 hover: cursor-pointer"
                    onClick={onMenuClick}>
                    {pageType !== "Add Page" && <EllipsisVertical size={18} color={COLORS.iconGray} />}
                </div>}
        </div>
    )
}