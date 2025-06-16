const COLORS = {
    focusYellow: "#F59D0E",
    textGray: "#677289",
    textBlack: "#1A1A1A",
    iconGray: "#8C93A1",
    backgroundGray: "#9DA4B226",
    hoverGray: "#9DA4B259"
}

type PageCardProps = {
    pageType: "Info" | "Details" | "Other" | "Ending" | "Add Page";
    focused?: boolean;
    onClick?: () => void
}

export { COLORS };
export type { PageCardProps };