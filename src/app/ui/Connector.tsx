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

    return (
        <div className={`my-auto hover:${!hideHover && "cursor-pointer"}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
            {(!isHovered && !isDragging) || hideHover ?
                <div className={`border-dashed border border-unfocus w-5 h-0`}>
                </div> :
                <div className="flex flex-row" onClick={onClick}>
                    <div className={`border-dashed border border-unfocus w-5 h-0 my-auto`}>
                    </div>
                    <div className={`
                        flex items-center justify-center
                        border-[0.5] p-1 border-unfocus my-auto
                        h-[16px] w-[16px]
                        rounded-full text-sm
                        bg-white`}>
                        +
                    </div>
                    <div className={`border-dashed border border-unfocus w-5 h-0 my-auto`}>
                    </div>
                </div>}
        </div>
    )
}