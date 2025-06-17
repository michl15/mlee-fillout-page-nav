"use client"
import React, { useState } from "react"

type ConnectorProps = {
    isDragging?: boolean;
    hideHover?: boolean;
    onClick: () => void;
}

export default function Connector({ isDragging, hideHover, onClick }: ConnectorProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true)
    }
    const handleMouseExit = () => {
        setIsHovered(false)
    }

    const renderConnector = () => {
        if (isDragging) {
            return (
                <div className="flex flex-row" onClick={onClick}>
                    <div className={`border-dashed border border-unfocus w-5 h-0 my-auto`}>
                    </div>
                    <div className="text-gray-500 px-1">
                        |
                    </div>
                    <div className={`border-dashed border border-unfocus w-5 h-0 my-auto`}>
                    </div>
                </div>
            )
        }
        if (!hideHover && isHovered && !isDragging) {
            return (
                <div className="flex flex-row" onClick={onClick}>
                    <div className={`border-dashed border border-unfocus w-5 h-0 my-auto`}>
                    </div>
                    <div className={`
                        flex items-center justify-center
                        border-[0.5] p-1 border-unfocus my-auto
                        h-[16px] w-[16px]
                        rounded-full text-sm
                        hover: cursor-pointer
                        bg-white`}>
                        +
                    </div>
                    <div className={`border-dashed border border-unfocus w-5 h-0 my-auto`}>
                    </div>
                </div>
            )
        }
        return (
            <div className={`border-dashed border border-unfocus w-5 h-0`}></div>
        )
    }

    return (
        <div className={`my-auto hover:${!hideHover && "cursor-pointer"}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
            {renderConnector()}
        </div>
    )
}