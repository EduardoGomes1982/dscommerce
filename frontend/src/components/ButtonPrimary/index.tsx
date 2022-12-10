import "./styles.css";

type Props = {
    buttonTitle: string;
}

export default function ButtomPrimary({ buttonTitle }: Props): JSX.Element {
    return (
        <div className="dsc-btn dsc-btn-blue">
            {buttonTitle}
        </div>
    );
}