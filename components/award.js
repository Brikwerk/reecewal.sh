import { CorporateFare, EmojiEvents, Today } from "@mui/icons-material";

export default function Award(props) {
    return (
        <div className="mb-5">
            <h3 className="text-xl pb-2">
                <EmojiEvents className="pb-0.5 pr-1"/>
                {props.title}
            </h3>
            <div className="pb-2">
                <span className="flex items-start pr-4 pb-2">
                    <span className="pr-2"><Today/></span>
                    <span className="pt-0.5">{props.received}</span>
                </span>
                <span className="flex items-start pr-4">
                    <span className="pr-2"><CorporateFare/></span>
                    <span className="pt-0.5">{props.organization}</span>
                </span>
            </div>
            <div className="font-body pl-4">
                {props.children}
            </div>
        </div>
    )
}