import { Place } from "@mui/icons-material";
import React, { useState } from "react";
import glacierLakeImg from "../public/images/glacier_lake.jpg"
import Image from "next/image";

export default function MountainsExplanation(props) {
    let [expandToggle, setExpandToggle] = useState(false);
    let mount = React.createRef();
    let icon = React.createRef();
    let info = React.createRef();

    function expand(e) {
        if (!expandToggle) {
            mount.style.height = "43rem";
            mount.style.width = "30rem";
            mount.style.maxHeight = "80vh";
            mount.style.maxWidth = "92.25vw";

            // Remove hover events
            mount.classList.remove("hover:bg-neutral-50");
            mount.classList.remove("hover:text-neutral-900");
            mount.classList.remove("hover:cursor-pointer");

            // Replace background and text colour
            mount.classList.remove("bg-neutral-900");
            mount.classList.remove("text-neutral-50");
            mount.classList.add("bg-neutral-50");
            mount.classList.add("text-neutral-900");

            // Remove padding
            mount.classList.remove("p-3");
            
            icon.style.opacity = "0";
            info.style.opacity = "100%";

            setExpandToggle(!expandToggle);
        }
    }

    function contract(e) {
        if (expandToggle) {
            // Add hover events
            mount.classList.add("hover:bg-neutral-50")
            mount.classList.add("hover:text-neutral-900");
            mount.classList.add("hover:cursor-pointer");

            // Replace background and text colour
            mount.classList.remove("bg-neutral-50");
            mount.classList.remove("text-neutral-900");
            mount.classList.add("bg-neutral-900");
            mount.classList.add("text-neutral-50");

            // Add padding
            mount.classList.add("p-3");

            mount.style = {};
            icon.style.opacity = "100%";
            info.style.opacity = "0";

            setExpandToggle(!expandToggle);
        }
    }

    return (
        <div className="z-10 fixed bottom-4 right-4">
            <div
                className='grid grid-cols-1 grid-rows-1 duration-200 border-2 h-14 w-14 p-3 rounded-md border-neutral-900 hover:cursor-pointer text-neutral-50 hover:text-neutral-900 bg-neutral-900 hover:bg-neutral-50'
                onClick={expand}
                ref={ref => mount = ref}
            >
                <div
                    className="z-10 flex flex-col transition-opacity duration-100 opacity-0 col-start-1 row-start-1"
                    ref={ref => info = ref}
                >
                    <div className="flex border-b-2 border-gray-900 mb-1">
                        <Image
                            src={glacierLakeImg}
                            width={1200}
                            height={570}
                            alt="An image of mountains with a lake"
                            className="rounded-t-md"
                            placeholder="blur"
                        />
                    </div>
                    <div className="px-4 py-3 text-xl flex justify-left items-center font-sans">
                        <Place className="mr-1"/>
                        Cathedral Lakes, BC
                    </div>
                    <div className="overflow-scroll px-5 text-neutral-700 flex-grow">
                        <p className="mb-2">
                            Welcome to Cathedral Provincial Park (AKA Cathedral Lakes)! The stylized 3D model featured
                            on the home page of this website is the result of photogrammetry using satellite
                            imagery and my personal photos.
                        </p>
                        <p className="mb-2">
                            {`By clicking/dragging and using your scrollwheel (or panning and pinching on mobile), 
                            you'll be able to explore the surrounding area. Your starting location is 
                            centred at Glacier Lake (pictured in full colour above), with a view of Pyramid 
                            Mountain, Quiniscoe Mountain, Lakeview Mountain, and The Boxcar.`}
                        </p>
                        <p className="mb-2">
                            {`Backcountry hiking here is one of my favourite places to explore, so I hope
                            you're able to enjoy this small slice of what the park has to offer in reality!`}
                        </p>
                    </div>
                    <div
                        className="rounded-b-md text-neutral-900 bg-neutral-50 hover:underline text-center p-3 border-t-2 border-t-neutral-900 cursor-pointer"
                        onClick={contract}
                    >
                        CLOSE
                    </div>
                </div>
                <div
                    className="transition-opacity duration-100 opacity-100 col-start-1 row-start-1 flex justify-center items-center"
                    ref={ref => icon = ref}
                >
                    <Place/>
                </div>
            </div>
        </div>
    )
}