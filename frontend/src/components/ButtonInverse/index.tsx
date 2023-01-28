import "./styles.css";

type Props = {
    buttonTitle: string,
    onButtonClick?: () => void
}

export default function ButtonInverse({ buttonTitle, onButtonClick }: Props): JSX.Element {
    return (
        <div onClick={onButtonClick} className="dsc-btn dsc-btn-white">
            {buttonTitle}
        </div>
    );
}