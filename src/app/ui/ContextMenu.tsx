import { Clipboard, Copy, Flag, PenLine, Trash2 } from "lucide-react"
import { COLORS, Option } from "../lib/constants"

const options: Option[] = [
    {
        label: "Set as first page",
        icon: <Flag color={COLORS.flagBlue} size={16} className="mr-2" fill={COLORS.flagBlue} />,
        onClick: () => { }
    },
    {
        label: "Rename",
        icon: <PenLine color={COLORS.iconGray} size={16} className="mr-2" />,
        onClick: () => { }
    },
    {
        label: "Copy",
        icon: <Clipboard color={COLORS.iconGray} size={16} className="mr-2" />,
        onClick: () => { }
    },
    {
        label: "Duplicate",
        icon: <Copy color={COLORS.iconGray} size={16} className="mr-2" />,
        onClick: () => { }
    }
]

export default function ContextMenu() {
    const renderOptions = () => {
        return options.map((option, index) => (
            <div key={`option-${index}`}
                className="flex flex-row py-2 px-4 text-sm hover:bg-unfocus-bg cursor-pointer"
                onClick={option.onClick}>
                {option.icon}
                <div>{option.label}</div>
            </div>
        ))
    }
    return (
        <div className="rounded-md w-[240px] border-[0.5px] border-page-border">
            <div className="py-3 px-4 bg-gray-100 rounded-t-md text-md">
                Settings
            </div>
            <hr className="border-gray-200" />
            <div className="bg-white">
                {renderOptions()}
            </div>
            <hr className="border-gray-200" />
            <div className="bg-white flex flex-row items-center py-3 px-4 text-sm hover:bg-unfocus-bg cursor-pointer rounded-b-md">
                <Trash2 size={16} color={COLORS.trashRed} className="mr-2" /> Delete
            </div>
        </div>
    )
}