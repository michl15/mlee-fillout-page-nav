"use client"

import { useState } from "react";
import { PageCardProps } from "../lib/constants"
import Connector from "./Connector";
import PageCard from "./PageCard";

type PageNavProps = {
    pages: PageCardProps[];
}

export default function PageNav({ pages }: PageNavProps) {
    const [navPages, setNavPages] = useState(pages);
    const [activePage, setActivePage] = useState(0);
    const [numPages, setNumPages] = useState(pages.length);

    const getPages = () => {
        return navPages.map((page, index) => (
            <div key={`page-${index}`} className="flex flex-row">
                <PageCard pageType={page.pageType} focused={activePage === index} onClick={() => setActivePage(index)} />
                <Connector hideHover={index === numPages - 1} onClick={() => {
                    navPages.splice(index + 1, 0, { pageType: "Other" });
                    setNavPages([...navPages]);
                    setNumPages(numPages + 1);
                    setActivePage(index + 1);
                }} />
            </div>
        ))
    }

    return (
        <div className="flex flex-row">
            {getPages()}
            <PageCard pageType="Add Page" focused={true} onClick={() => {
                navPages.splice(numPages, 0, { pageType: "Other" });
                setNavPages([...navPages]);
                setActivePage(numPages)
                setNumPages(numPages + 1);
            }} />
        </div>
    )
}