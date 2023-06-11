import React, { useState } from 'react';
import { ChevronRight, ExpandMore } from "@mui/icons-material";

export default function Section(props) {
    const [accordionState, setAccordionState] = useState(null);

    let pointerStyle = "";
    let accordionContentStyle = "";
    let accordionButton = <ChevronRight viewBox="6 6 12 12" sx={{ fontSize: 20 }}/>

    // Apply accordion styling if activated
    if (props.accordion) {
        accordionContentStyle = " hidden";

        // Check if the user has specified to show content
        // If not, hide by default
        if (accordionState === null) {
            if (props.accordionHidden === false) {
                setAccordionState(true); // Accordion content is shown
            } else {
                setAccordionState(false); // Accordion content is hidden
            }
        }

        // Apply cursor pointer
        pointerStyle = " cursor-pointer";
        if (accordionState) {
            accordionButton = <ExpandMore viewBox="6 6 12 12" sx={{ fontSize: 20 }}/>
            accordionContentStyle = "";
        }
    }

    return (
        <div className="text-neutral-900 mb-7">
            <div
                onClick={() => {setAccordionState(!accordionState)}}
                className={"hover:underline flex items-center justify-left mb-5" + pointerStyle}
            >
                {
                    props.accordion &&
                    <div className="pr-2 flex items-center justify-center">
                        {accordionButton}
                    </div>
                }
                <h2 className="text-3xl pr-4">{props.title}</h2>
             </div>
             <div className={'sm:border-l-2 sm:ml-2.5 pl-2 pr-2 sm:pl-5 sm:pr-0' + accordionContentStyle}>
                {props.children}
            </div>
        </div>
    )
}