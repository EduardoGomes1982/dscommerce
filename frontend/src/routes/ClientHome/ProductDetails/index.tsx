import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ProductDetailsCard from "../../../components/ProductDetailsCard";
import { ProductDTO } from "../../../models/product";
import * as cartService from "../../../services/cart-service";
import * as productService from "../../../services/product-service";
import "./styles.css";

export default function ProductDetails(): JSX.Element {
    const params = useParams();
    const [product, setProduct] = useState<ProductDTO>();
    const navigate = useNavigate();

    useEffect(() => {
        productService.findById(Number(params.productId)).then(
            response => {
                setProduct(response.data);
            }
        ).catch(() => navigate("/"));
    }, []);

    function handleBuyClick(event: any) {
        if (product) {
            cartService.addProduct(product);
            navigate("/cart")
        }
    }

    return (
        <main>
            <section id="product-details-section" className="dsc-container">
                {product && <ProductDetailsCard product={product} />}
                <div className="dsc-btn-page-container">
                    <div onClick={handleBuyClick}>
                        <ButtonPrimary buttonTitle="Comprar" />
                    </div>
                    <NavLink to="/">
                        <ButtonInverse buttonTitle="Início" />
                    </NavLink>
                </div>
            </section>
        </main>
    );
}