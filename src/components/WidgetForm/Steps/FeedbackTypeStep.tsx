import { FeedbackType, feedbackTypes } from ".."
import { CloseButton } from "../../CloseButton";

interface onFeedbackTypeChangedProps {
    onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export function FeedbackTypeStep({onFeedbackTypeChanged} : onFeedbackTypeChangedProps){
    return(
        <>
            <header>
                <span className="text-xl leading-6">Deixe seu Feedback</span>
                <CloseButton />
            </header>

            <div className="flex py-8 gap-2 w-full">
                { Object.entries(feedbackTypes).map(([key, value])=> {
                    return(
                        <button
                        className="bg-zinc-700 rounded-lg py-5 w-24 flex-1 flex-col items-center gap-2 border-2 border-transparent focus:border-brand-500 focus:outline-none"
                        key={key}
                        type="button"
                        onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
                        >
                            <img src={value.image.source} alt={value.image.alt}/>
                            <span>{value.title}</span>
                        </button>
                    )
                })}
            </div>
        </>
    )
}