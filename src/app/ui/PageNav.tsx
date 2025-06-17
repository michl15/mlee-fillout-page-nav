"use client"

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Coordinates, PageCardProps } from "../lib/constants"
import Connector from "./Connector";
import PageCard from "./PageCard";
import ContextMenu from "./ContextMenu";

type PageNavProps = {
    pages: PageCardProps[];
}

export default function PageNav({ pages }: PageNavProps) {
    const [navPages, setNavPages] = useState(pages);
    const [activePage, setActivePage] = useState(0);
    const [numPages, setNumPages] = useState(pages.length);
    const [breakpoints, setBreakpoints] = useState<number[]>([]);
    const [curNearestIndex, setCurNearestIndex] = useState(-1);
    const [isDraggingLeft, setIsDraggingLeft] = useState(false);
    const [isDraggingRight, setIsDraggingRight] = useState(false);
    const [curX, setCurX] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState<Coordinates>({ x: 0, y: 0 })

    const pagesRef = useRef<HTMLDivElement[] | null>([]);

    useEffect(() => {
        const newBreakpoints: number[] = [];
        if (pagesRef.current) {
            pagesRef.current.forEach((ref) => {
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    const breakpoint = rect.left + (rect.width / 2);
                    newBreakpoints.push(breakpoint)
                }
            });
            setBreakpoints(newBreakpoints);
        }
    }, [navPages]);

    useEffect(() => {
        setMenuOpen(false);
    }, [activePage])

    const findNearestBreakpoint = (index: number, x: number) => {
        let closest = index;
        let minDistance = Infinity;
        for (let i = 0; i < numPages; i++) {
            const breakpt = breakpoints[i];
            const dist = x - breakpt;
            if (Math.abs(dist) < Math.abs(minDistance)) {
                closest = i;
                minDistance = dist;
            }
        }
        if (x - curX <= 0) {
            setIsDraggingLeft(true);
            setIsDraggingRight(false);
        } else {
            setIsDraggingLeft(false);
            setIsDraggingRight(true);
        }
        return closest;
    }

    const insertIndex = (index: number, newIndex: number) => {
        const temp = navPages[index];
        navPages.splice(index, 1);
        navPages.splice(newIndex, 0, temp);
        setNavPages([...navPages]);
    }

    const handleDragEnd = (event: React.DragEvent<HTMLElement>, index: number) => {
        const x = event.clientX;
        const nearest = findNearestBreakpoint(index, x);
        setCurNearestIndex(-1);
        setIsDraggingLeft(false);
        setIsDraggingRight(false);
        setActivePage(nearest);
        insertIndex(index, nearest);
    }

    const handleDrag = (event: React.DragEvent<HTMLElement>, index: number) => {
        const x = event.clientX;
        const nearest = findNearestBreakpoint(index, x);
        setCurNearestIndex(nearest);
    }

    const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
        setCurX(event.clientX);
    }

    const getIsDragging = useCallback((index: number) => {
        return (isDraggingLeft && index + 1 === curNearestIndex) || (isDraggingRight && index === curNearestIndex);
    }, [curNearestIndex, isDraggingLeft, isDraggingRight]);

    const onMenuClick = (index: number) => {
        let position = { x: 0, y: 0 }
        if (pagesRef.current) {
            const ref = pagesRef.current[index];
            const rect = ref.getBoundingClientRect();
            position = { x: rect.x, y: rect.y }
        }
        setMenuOpen(!menuOpen);
        setMenuPosition(position);
    }

    const getPages = () => {
        return navPages.map((page, index) => (
            <div key={`page-${index}`} className="flex flex-row" ref={(element) => {
                if (element && pagesRef.current) {
                    pagesRef.current[index] = element
                }
            }}
            >
                <div draggable={!menuOpen}
                    onDragEnd={(e) => { handleDragEnd(e, index); }}
                    onDrag={(e) => { handleDrag(e, index); }}
                    onDragStart={(e) => { handleDragStart(e) }}>
                    <PageCard
                        pageType={page.pageType}
                        focused={activePage === index}
                        onClick={() => setActivePage(index)}
                        onMenuClick={() => onMenuClick(index)} />
                </div>
                <Connector onClick={() => {
                    navPages.splice(index + 1, 0, { pageType: "New" });
                    setMenuOpen(false);
                    setNavPages([...navPages]);
                    setNumPages(numPages + 1);
                    setActivePage(index + 1);
                }} isDragging={curNearestIndex >= 0 && getIsDragging(index)} />
            </div>
        ))
    }

    return (
        <div>
            {menuOpen &&
                <div className={`absolute mb-12`}
                    style={{
                        bottom: Math.round(menuPosition.y),
                        left: Math.round(menuPosition.x)
                    }}
                >
                    <ContextMenu />
                </div>}
            <div className="flex flex-row">
                {getPages()}
                <PageCard pageType="Add Page" focused={true} onClick={() => {
                    navPages.splice(numPages, 0, { pageType: "New" });
                    setNavPages([...navPages]);
                    setActivePage(numPages)
                    setNumPages(numPages + 1);
                }} />
            </div>
        </div>
    )
}