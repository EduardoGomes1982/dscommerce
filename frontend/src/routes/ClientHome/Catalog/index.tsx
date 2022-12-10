import ButtonNextPage from "../../../components/ButtonNextPage";
import CatalogCard from "../../../components/CatalogCard";
import SearchBar from "../../../components/SearchBar";
import { ProductDTO } from "../../../models/product";
import * as productService from "../../../services/product-service";
import "./styles.css";

const products: ProductDTO[] = productService.findAll();

export default function Catalog(): JSX.Element {
    return (
        <main>
            <section id="catalog-section" className="dsc-container">
                <SearchBar />
                <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
                    {
                        products.map(p => (<CatalogCard key={p.id} product={p} />))
                    }
                </div>
                <ButtonNextPage />
            </section>
        </main>
    );
}