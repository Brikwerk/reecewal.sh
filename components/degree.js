import { Today, School, LibraryBooks } from "@mui/icons-material";

export default function Degree(props) {
    return (
        <div className="p-5 mb-6 rounded-md border-2 border-neutral-900">
            <h3 className="text-lg pb-3 text-center border-b-2 border-b-neutral-900 mb-4">{props.title}</h3>
            <div className="font-body">
                <div className="flex items-start pr-4 pb-2">
                    <span className="pr-2"><LibraryBooks/></span>
                    <span className="pt-0.5">{props.specialization}</span>
                </div>
                <div className="flex items-start pr-4 pb-1">
                    <span className="pr-2"><Today/></span>
                    <span className="pt-0.5">{props.received}</span>
                </div>
                <div className="flex items-start pr-4">
                    <span className="pr-2"><School/></span>
                    <span className="pt-0.5">{props.institution}</span>
                </div>
            </div>
            <div className="font-body">
                {props.children}
            </div>
        </div>
    )
}