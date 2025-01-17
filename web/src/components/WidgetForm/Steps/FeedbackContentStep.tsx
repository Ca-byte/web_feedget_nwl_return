import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from ".."
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton"
import { Loading } from "../../Loading";
import { ScreeshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}
export function FeedbackContentStep({
    feedbackType, 
    onFeedbackRestartRequested,
    onFeedbackSent
}:FeedbackContentStepProps ){

    const [ screenshot, setScreenshot ] = useState<string | null>(null);
    const [comment, setComment] = useState('')
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)
    const feedbackTypeInfo = feedbackTypes[feedbackType];
    
    async function handleSubmitFeedback(event: FormEvent){
        event.preventDefault();

        setIsSendingFeedback(true);

        // console.log({
        //     screenshot, comment,
        // })

        await api.post('/feedbacks',{
            type: feedbackType,
            comment,
            screenshot,

        })
        onFeedbackSent();
        setIsSendingFeedback(false);

    }
    return(
        <>
        <header>
            <button 
                type="button" 
                className="top-5 left-5 absolute dark:text-zinc-400 text-zinc-800 hover:text-zinc-100"
                onClick={onFeedbackRestartRequested}
                >
                    <ArrowLeft weight="bold" className="w-4 h-4"/>
            </button>

            <span className="text-xl leading-6 flex items-center gap-2">
                <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
                {feedbackTypeInfo.title}
            </span>
            <CloseButton />
        </header>

        <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
            <textarea
            onChange={event => setComment(event.target.value)}
                className="min-w-[304px] w-full min-h-[112px] text-sm dark:placeholder-zinc-400 dark:text-zinc-100 text-zinc-800 dark:border-zinc-600 border-zinc-300 bg-transparent rounded-md dark:border-x-brand-500 border-x-brand-600 dark:focus:ring-brand-500 focus:ring-brand-600 focus:ring-1 focus:outline-none resize-none dark:scrollbar-thumb-zinc-700 scrollbar-thumb-zinc-300  scrollbar-track-transparent scrollbar-thin" 
                placeholder="Conte em detalhes o que está acontencendo..."
            />
            <footer className="flex mt-2 gap-2">
               <ScreeshotButton
                screenshot={screenshot} 
                onScreenshotTook={setScreenshot}/>
                
                <button
                disabled={comment.length === 0 || isSendingFeedback}
                type="submit"
                className="p-2 dark:bg-brand-500 bg-brand-600 text-zinc-100 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500">
                    { isSendingFeedback ? <Loading /> : 'Enviar feedback'}
                </button>
            </footer>
        </form>
    </>
    )
}