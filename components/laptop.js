import React, { useState, useEffect } from 'react';
import Image from 'next/image'

import laptopSVG from '../public/svgs/laptop.svg'

let cowsay_text = ` _____
< Hi! >
 ----- \\  ^__^
        \\ (oo)\\______
          (__)\\     `;

let cowsay = [
    {
        action: "SLEEP",
        sleepLength: 500
    },
    {
        action: "TYPE",
        text: "cowsay Hi!",
    },
    {
        action: "SLEEP",
        sleepLength: 500
    },
    {
        action: "TYPE",
        text: "\n",
    },
    {
        action: "SLEEP",
        sleepLength: 200
    },
    {
        action: "INSTANT_TYPE",
        text: cowsay_text
    }
]

function sleep(milliseconds) {
    return new Promise((res) => setTimeout(res, milliseconds));
}

export default function LaptopTerminal(props) {
    const [terminal, setTerminal] = useState("$ █");
    const [commandNum, setCommandNum] = useState(0);
    const [commandChar, setCommandChar] = useState(0);
    const [laptopLoaded, setLaptopLoaded] = useState(false);

    // Future Improvement: randomly select input
    let inputCommands = cowsay;

    let terminalVisible = "hidden";
    if (laptopLoaded) {
        terminalVisible = "";
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!laptopLoaded) {}
            // If we have another command to process
            else if (commandNum < inputCommands.length) {
                let command = inputCommands[commandNum];

                // Sleep before doing the next command
                if (command.action === "SLEEP") {
                    sleep(command.sleepLength).then(() => {
                        setCommandNum(commandNum + 1);
                    })
                // Type the command out, one character at a time
                } else if (command.action === "TYPE") {
                    if (commandChar < command.text.length) {
                        let prefix = terminal.slice(0, terminal.length - 1)
                        setTerminal(prefix + command.text[commandChar] + "█");
                        setCommandChar(commandChar + 1);
                    } else {
                        setCommandChar(0);
                        setCommandNum(commandNum + 1);
                    }
                // Instantly enter the text, no typing
                } else if (command.action === "INSTANT_TYPE") {
                    let prefix = terminal.slice(0, terminal.length - 1)
                    setTerminal(prefix + command.text + "█");
                    setCommandNum(commandNum + 1);
                }
            }
        }, Math.random() * (175 - 50) + 50); // Typing speed in ms

        return () => clearTimeout(timeout);
    }, [terminal, commandNum, commandChar, inputCommands, laptopLoaded]);

    const terminalHTML = terminal.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));

    return (
        <div className="relative h-[145px] w-[200px]">
            <div 
                id="laptop-terminal-pre"
                className={terminalVisible + " left-[42px] top-[15px] w-[116px] max-h-[72px] flex flex-col-reverse overflow-y-scroll no-scrollbar whitespace-pre break-words font-mono font-bold text-[9px] text-[#00ff24] leading-[12px] absolute z-10"}
            >
                {terminalHTML}
            </div>
            <Image
                src={laptopSVG}
                alt="An image of a laptop with a terminal displayed."
                height={145}
                width={200}
                onLoad={() => {setLaptopLoaded(true)}}
            />
        </div>
    )
}