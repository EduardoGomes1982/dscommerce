import "./styles.css";

type Props = {
    name: string;
}

export default function ProductCategory({ name } : Props): JSX.Element {
    return (
        <div className="dsc-category">
            {name}
        </div>
    )
}