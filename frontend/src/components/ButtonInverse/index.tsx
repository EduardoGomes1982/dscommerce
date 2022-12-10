import "./styles.css";

type Props = {
    buttonTitle: string;
}

export default function ButtomInverse({ buttonTitle }: Props): JSX.Element {
    return (
        <div className="dsc-btn dsc-btn-white">
            {buttonTitle}
        </div>
    );
}