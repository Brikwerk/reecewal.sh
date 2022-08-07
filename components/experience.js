import { Business, Place, Today } from "@mui/icons-material";

export default function Experience(props) {
    return (
        <div className="mb-5">
            <h3 className="text-xl pb-2">{props.title}</h3>
            <div className="pb-2">
                <span className="flex sm:inline-flex items-center pr-4 pb-2 sm:pb-0">
                    <span className="pr-1.5"><Business/></span>
                    <span className="pt-0.5">{props.employer}</span>
                </span>
                <span className="flex sm:inline-flex items-center pr-4 pb-2 sm:pb-0">
                    <span className="pr-1.5"><Today/></span>
                    <span className="pt-0.5">{props.timeline}</span>
                </span>
                <span className="flex sm:inline-flex items-center pr-4">
                    <span className="pr-1"><Place/></span>
                    <span className="pt-0.5">{props.location}</span>
                </span>
            </div>
            <div className="font-body">
                {props.children}
            </div>
        </div>
    )
}