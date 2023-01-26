import { useEffect, useState } from "react";
import prodImg from "../../../assets/computer.png";
import deleteIcon from "../../../assets/delete.svg";
import editIcon from "../../../assets/edit.svg";
import { ProductDTO } from "../../../models/product";
import { QueryParams } from "../../../utils/params-type";
import * as productService from "../../../services/product-service";
import "./styles.css";
import SearchBar from "../../../components/SearchBar";
import DialogInfo from "../../../components/DialogInfo";
import DialogConfirmation from "../../../components/DialogConfirmation";

export default function ProductListing() {
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [isLastPage, setIsLastPage] = useState(false);
    const [dialogInfoData, setDialogInfoData] = useState({
        visible: false,
        message: "Operação com Sucesso"
    });
    const [dialogConfirmationAnswer, setDialogConfirmationAnswer] = useState({
        id: 0,
        visible: false,
        message: "Tem certeza?"
    });

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
        setProducts([]);
        setQueryParams({ ...queryParams, page: 0, name: searchText });
    }

    function handleNextPageClick() {
        setQueryParams({ ...queryParams, page: ++queryParams.page });
    }

    function handleDialogInfoClose() {
        setDialogInfoData({ ...dialogInfoData, visible: false });
    }

    function handleDeleteClick(productId: number) {
        setDialogConfirmationAnswer({ ...dialogConfirmationAnswer, visible: true, id: productId });
    }

    function handleDialogConfirmationAnswer(productId: number, answer: boolean) {
        if (answer)
            productService.deleteById(productId)
                .then(() => {
                    setProducts([]);
                    setQueryParams({ ...queryParams, page: 0 });
                })
                .catch(err => {
                    setDialogInfoData({ ...dialogInfoData, visible: true, message: err.response.data.error });
                });
        setDialogConfirmationAnswer({ ...dialogConfirmationAnswer, visible: false });
    }

    return (
        <main>
            <section id="product-listing-section" className="dsc-container">
                <h2 className="dsc-section-title dsc-mb20">Cadastro de produtos</h2>
                <div className="dsc-btn-page-container dsc-mb20">
                    <div className="dsc-btn dsc-btn-white">Novo</div>
                </div>
                <SearchBar onSearch={handleSearch} />
                <table className="dsc-table dsc-mb20 dsc-mt20">
                    <thead>
                        <tr>
                            <th className="dsc-tb576">ID</th>
                            <th></th>
                            <th className="dsc-tb768">Preço</th>
                            <th className="dsc-txt-left">Nome</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => (
                                <tr key={product.id}>
                                    <td className="dsc-tb576">{product.id}</td>
                                    <td><img className="dsc-product-listing-image" src={product.imgUrl} alt={product.name} /></td>
                                    <td className="dsc-tb768">R$ {product.price}</td>
                                    <td className="dsc-txt-left">{product.name}</td>
                                    <td><img className="dsc-product-listing-btn" src={editIcon} alt="Editar" /></td>
                                    <td>
                                        <img className="dsc-product-listing-btn" src={deleteIcon} alt="Deletar"
                                            onClick={() => handleDeleteClick(product.id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {!isLastPage && <div onClick={handleNextPageClick} className="dsc-btn-next-page">Carregar mais</div>}
            </section>
            {
                dialogInfoData.visible &&
                <DialogInfo message={dialogInfoData.message} onDialogClose={handleDialogInfoClose} />
            }
            {
                dialogConfirmationAnswer.visible &&
                <DialogConfirmation message={dialogConfirmationAnswer.message} onDialogAnswer={handleDialogConfirmationAnswer}
                    id={dialogConfirmationAnswer.id}
                />
            }
        </main>
    );
}