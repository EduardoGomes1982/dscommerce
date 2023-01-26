import ButtomPrimary from "../ButtonPrimary";

type Props = {
    id: number,
    message: string,
    onDialogAnswer: (id: number, answer: boolean) => void
}

export default function DialogConfirmation({ id, message, onDialogAnswer }: Props) {
    return (
        <div className="dsc-dialog-background" onClick={() => onDialogAnswer(id, false)}>
            <div className="dsc-dialog-box" onClick={(e) => e.stopPropagation()}>
                <h2>{message}</h2>
                <div className="dsc-dialog-btn-container">
                    <ButtomPrimary buttonTitle="Não" onButtonClick={() => onDialogAnswer(id, false)} />
                    <ButtomPrimary buttonTitle="Sim" onButtonClick={() => onDialogAnswer(id, true)} />
                </div>
            </div>
        </div>
    );
}