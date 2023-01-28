import ButtonPrimary from "../ButtonPrimary";

type Props = {
    message: string,
    onDialogClose: () => void
}

export default function DialogInfo({ message, onDialogClose }: Props) {
    return (
        <div className="dsc-dialog-background" onClick={onDialogClose}>
            <div className="dsc-dialog-box" onClick={(e) => e.stopPropagation()}>
                <h2>{message}</h2>
                <ButtonPrimary buttonTitle="Ok" onButtonClick={onDialogClose} />
            </div>
        </div>
    );
}