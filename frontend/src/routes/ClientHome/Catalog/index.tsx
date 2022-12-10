import ButtonNextPage from "../../../components/ButtonNextPage";
import CatalogCard from "../../../components/CatalogCard";
import HeaderClient from "../../../components/HeaderClient";
import SearchBar from "../../../components/SearchBar";
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

const products: ProductDTO[] = [
    product, product, product
]

export default function Catalog(): JSX.Element {
    return (
        <main>
            <section id="catalog-section" className="dsc-container">
                <SearchBar />
                <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
                    {
                        products.map(p => (<CatalogCard product={p} />))
                    }
                </div>
                <ButtonNextPage />
            </section>
        </main>
    );
}