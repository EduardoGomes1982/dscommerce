import "./styles.css";

type Props = {
    buttonTitle: string,
    onButtonClick?: () => void
}

export default function ButtonPrimary({ buttonTitle, onButtonClick }: Props): JSX.Element {
    return (
        <div onClick={onButtonClick} className="dsc-btn dsc-btn-blue">
            {buttonTitle}
        </div>
    );
}