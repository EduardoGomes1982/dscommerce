import ButtomPrimary from "../ButtonPrimary";

type Props = {
    message: string,
    onDialogAnswer: (answer: boolean) => void
}

export default function DialogConfirmation({ message, onDialogAnswer }: Props) {
    return (
        <div className="dsc-dialog-background" onClick={() => onDialogAnswer(false)}>
            <div className="dsc-dialog-box" onClick={(e) => e.stopPropagation()}>
                <h2>{message}</h2>
                <div className="dsc-dialog-btn-container">
                    <ButtomPrimary buttonTitle="Não" onButtonClick={() => onDialogAnswer(false)} />
                    <ButtomPrimary buttonTitle="Sim" onButtonClick={() => onDialogAnswer(true)} />
                </div>
            </div>
        </div>
    );
}