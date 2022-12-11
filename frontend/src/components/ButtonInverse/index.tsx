import { Link } from "react-router-dom";
import "./styles.css";

type Props = {
    buttonTitle: string;
}

export default function ButtomInverse({ buttonTitle }: Props): JSX.Element {
    return (
        <Link to="/">
            <div className="dsc-btn dsc-btn-white">
                {buttonTitle}
            </div>
        </Link>
    );
}