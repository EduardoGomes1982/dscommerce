import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import HeaderClient from "../../../components/HeaderClient";
import ProductDetailsCard from "../../../components/ProductDetailsCard";
import { ProductDTO } from "../../../models/product";
import "./styles.css";

const product: ProductDTO = {
    id: 2,
    name: "Smart TV 43\" Led",
    description: "Esta é uma bela TV e do tamanho certo para seu gosto.",
    imgUrl: "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg",
    price: 2859.99,
    categories: [
        {
            id: 3,
            name: "Compudadores"
        },
        {
            id: 5,
            name: "Eletrônicos"
        },
        {
            id: 1,
            name: "Importados"
        }
    ]
}

export default function ProductDetails(): JSX.Element {
    return (
        <main>
            <section id="product-details-section" className="dsc-container">
                <ProductDetailsCard product={product} />
                <div className="dsc-btn-page-container">
                    <ButtonPrimary buttonTitle="Comprar" />
                    <ButtonInverse buttonTitle="Início" />
                </div>
            </section>
        </main>
    );
}