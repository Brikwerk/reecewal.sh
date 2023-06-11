import { CorporateFare, EmojiEvents, Today } from "@mui/icons-material";

export default function Award(props) {
    return (
        <div className="mb-7">
            <h3 className="text-xl pb-2">
                <EmojiEvents className="pb-0.5 pr-1"/>
                {props.title}
            </h3>
            <div className="pb-1">
                <span className="inline-flex items-start pr-4 pb-2">
                    <span className="pr-2"><Today/></span>
                    <span className="pt-0.5">{props.received}</span>
                </span>
                <span className="inline-flex items-start pr-4">
                    <span className="pr-1.5"><CorporateFare/></span>
                    <span className="pt-0.5">{props.organization}</span>
                </span>
            </div>
            <div className="font-body text-justify">
                {props.children}
            </div>
        </div>
    )
}