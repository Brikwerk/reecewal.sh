import { OpenInNew } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image"

export default function Project(props) {
    return (
        <div className="flex mb-5">
            <div className="h-16 sm:h-24 w-16 sm:w-24 pr-4 flex-grow-0 flex-shrink-0">
                <Image
                    src={props.imageSrc}
                    alt={props.imageAlt}
                    width={96}
                    height={96}
                    className="rounded-full w-full"
                />
            </div>
            <div className="flex-grow">
                <h3 className="text-lg sm:text-xl pb-2 underline">
                    <a target="_blank" rel="noopener noreferrer" href={props.projectLink}>
                        {props.title}
                    </a>
                    <OpenInNew className="pb-1"/>
                </h3>
                <div className="font-body">
                    {props.children}
                </div>
            </div>
        </div>
    )
}