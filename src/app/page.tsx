"use client"
import { PageCardProps } from "./lib/constants";
import PageNav from "./ui/PageNav";

export default function Home() {
  const pages: PageCardProps[] = [
    { pageType: "Info" },
    { pageType: "Details" },
    { pageType: "Ending" }
  ]
  return (
    <div className="flex justify-center items-center h-screen">
      <PageNav pages={pages} />
    </div>
  );
}
