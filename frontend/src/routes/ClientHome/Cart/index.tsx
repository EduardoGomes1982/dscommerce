import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonClearCart from "../../../components/ButtonClearCart";
import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import { OrderDTO } from "../../../models/order";
import * as cartService from "../../../services/cart-service";
import * as orderService from "../../../services/order-service";
import { ContextCartCount } from "../../../utils/context-cart";
import "./styles.css";

export default function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState<OrderDTO>(cartService.getCart());
    const { setContextCartCount } = useContext(ContextCartCount);

    function handleClearClick() {
        cartService.clearCart();
        updateCart();
    }

    function handleIncreaseItemClick(productId: number) {
        cartService.increaseItem(productId);
        updateCart();
    }

    function handleDecreaseItemClick(productId: number) {
        cartService.decreaseItem(productId);
        updateCart();
    }

    function handleRemoveItemClick(productId: number) {
        cartService.removeItem(productId);
        updateCart();
    }

    function updateCart() {
        const cart = cartService.getCart();
        setCart(cart);
        setContextCartCount(cart.items.length);
    }

    function handlePlaceOrderClick() {
        orderService.placeOrderRequest(cart)
            .then(response => {
                cartService.clearCart();
                setContextCartCount(0);
                navigate(`/confirmation/${response.data.id}`);
            });
    }

    return (
        <main>
            <section id="cart-container-section" className="dsc-container">
                {cart.items.length === 0
                    ? (
                        <div>
                            <h2 className="dsc-section-title dsc-mb20">Seu carrinho está vazio</h2>
                        </div>
                    )
                    : (
                        <div className="dsc-card dsc-mb20">
                            {cart.items.map(item =>
                                <div key={item.productId} className="dsc-cart-item-container dsc-line-bottom">
                                    <div className="dsc-cart-item-left">
                                        <img src={item.imgUrl} alt={item.name} />
                                        <div className="dsc-cart-item-description">
                                            <h3>{item.name}</h3>
                                            <div className="dsc-cart-item-quantity-container">
                                                <div onClick={() => handleDecreaseItemClick(item.productId)} className="dsc-cart-item-quantity-btn">-</div>
                                                <p>{item.quantity}</p>
                                                <div onClick={() => handleIncreaseItemClick(item.productId)} className="dsc-cart-item-quantity-btn">+</div>
                                            </div>
                                            <div onClick={() => handleRemoveItemClick(item.productId)} className="dsc-cart-remove-item">Remover</div>
                                        </div>
                                    </div>
                                    <div className="dsc-cart-item-right">
                                        R$ {item.subTotal.toFixed(2)}
                                    </div>
                                </div>
                            )}
                            < div className="dsc-cart-total-container">
                                <h3>R$ {cart.total.toFixed(2)}</h3>
                            </div>
                        </div>
                    )}
                <div className="dsc-btn-page-container">
                    <ButtonPrimary buttonTitle="Finalizar pedido" onButtonClick={handlePlaceOrderClick} />
                    <NavLink to="/catalog">
                        <ButtonInverse buttonTitle="Continuar comprando" />
                    </NavLink>
                    <div onClick={handleClearClick}>
                        <ButtonClearCart buttonTitle="Limpar carrinho" />
                    </div>
                </div>
            </section>
        </main >
    );
}