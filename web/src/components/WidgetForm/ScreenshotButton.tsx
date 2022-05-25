import { Camera, Trash } from "phosphor-react";
import html2canvas from 'html2canvas'
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
    screenshot: string | null;
    onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreeshotButton({
    screenshot,
    onScreenshotTook
}:ScreenshotButtonProps){

    const [IsTakingScreenshot, setIstakingScreenshot] = useState(false);
    
    async function handleTakeScreenshot(){
        setIstakingScreenshot(true)
        const canvas = await html2canvas(document.querySelector('html')!);
        const base64image = canvas.toDataURL('image/png');

        onScreenshotTook(base64image);

        setIstakingScreenshot(false);

    }

    if(screenshot){
       return(
           <button
            type="button"
            onClick={()=> onScreenshotTook(null)}
            className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end dark:text-zinc-400 text-zinc-500 dark:hover:text-zinc-100 hover:text-zinc-200 transition-colors"
            style={{
                backgroundImage: `url(${screenshot})`,
                backgroundPosition: 'right bottom',
                backgroundSize: 180,
            }}
           >
            <Trash weight="fill"/>
           </button>
       )
    }

    return(
        <button
        type="button"
        onClick={handleTakeScreenshot}
        className="p-2 dark:bg-zinc-800 bg-white rounded-md border-transparent dark:hover:bg-zinc-700 hover:bg-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900  dark:focus:ring-brand-500 focus:ring-brand-600 "
    >
        { IsTakingScreenshot ? (
            <Loading /> ):(
        <Camera className="w-6 h-6 dark:text-zinc-100 text-zinc-800"/>
        )}
    </button>
    )
}