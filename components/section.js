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
        <div className="text-neutral-900 mb-6">
            <div
                onClick={() => {setAccordionState(!accordionState)}}
                className={"flex items-center justify-center mb-5" + pointerStyle}
            >
                {
                    props.accordion &&
                    <div className="pr-2 flex items-center justify-center">
                        {accordionButton}
                    </div>
                }
                <h2 className="text-2xl pr-4">{props.title}</h2>
                <div className="flex-grow h-px bg-neutral-900"></div>
             </div>
             <div className={'pl-2' + accordionContentStyle}>
                {props.children}
            </div>
        </div>
    )
}