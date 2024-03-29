import { useEffect, useState } from "react";
import ButtonNextPage from "../../../components/ButtonNextPage";
import CatalogCard from "../../../components/CatalogCard";
import SearchBar from "../../../components/SearchBar";
import { ProductDTO } from "../../../models/product";
import * as productService from "../../../services/product-service";
import { QueryParams } from "../../../utils/params-type";
import "./styles.css";

export default function Catalog(): JSX.Element {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [isLastPage, setIsLastPage] = useState(false);
    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 0,
        name: ""
    });

    useEffect(() => {
        productService.findPageRequest(queryParams.page, queryParams.name).then(
            response => {
                setProducts(products.concat(response.data.content));
                setIsLastPage(response.data.last);
            }
        );
    }, [queryParams]);

    function handleSearch(searchText: string) {
        setProducts([])
        setQueryParams({ ...queryParams, page: 0, name: searchText });
    }

    function handleNextPageClick() {
        setQueryParams({ ...queryParams, page: ++queryParams.page })
    }

    return (
        <main>
            <section id="catalog-section" className="dsc-container">
                <SearchBar onSearch={handleSearch} />
                <div className="dsc-catalog-cards dsc-mb20 dsc-mt20">
                    {
                        products.map(p => (<CatalogCard key={p.id} product={p} />))
                    }
                </div>
                {
                    !isLastPage &&
                    <div onClick={handleNextPageClick}>
                        <ButtonNextPage />
                    </div>
                }
            </section>
        </main>
    );
}