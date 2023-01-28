import "./styles.css";

type Props = {
    buttonTitle: string;
}

export default function ButtonClearCart({ buttonTitle }: Props): JSX.Element {
    return (
        <div className="dsc-btn dsc-btn-clear">
            {buttonTitle}
        </div>
    );
}