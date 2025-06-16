"use client"
import { DndContext } from "@dnd-kit/core";
import { PageCardProps } from "./lib/constants";
import PageNav from "./ui/PageNav";

export default function Home() {
  const pages: PageCardProps[] = [
    { pageType: "Info" },
    { pageType: "Details" },
    { pageType: "Ending" }
  ]
  return (
    <DndContext>
      <div className="flex justify-center items-center h-screen">
        <PageNav pages={pages} />
      </div>
    </DndContext>
  );
}
