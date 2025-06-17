const COLORS = {
    focusYellow: "#F59D0E",
    textGray: "#677289",
    textBlack: "#1A1A1A",
    iconGray: "#8C93A1",
    backgroundGray: "#9DA4B226",
    hoverGray: "#9DA4B259",
    flagBlue: "#155dfc",
    trashRed: "#e7000b"
}

type PageCardProps = {
    pageType: "Info" | "Details" | "Ending" | "Add Page" | string;
    focused?: boolean;
    onClick?: () => void;
    onMenuClick?: () => void;
}

type Coordinates = {
    x: number,
    y: number
}

type Option = {
    label: string,
    icon: React.ReactNode,
    onClick: () => void
}

export { COLORS };
export type { PageCardProps, Coordinates, Option };