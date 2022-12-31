import { useState } from "react";
import { NavLink } from "react-router-dom";
import ButtomClearCart from "../../../components/ButtonClearCart";
import ButtomInverse from "../../../components/ButtonInverse";
import ButtomPrimary from "../../../components/ButtonPrimary";
import { OrderDTO } from "../../../models/order";
import * as cartService from "../../../services/cart-service";
import "./styles.css";

export default function Cart() {
    const [cart, setCart] = useState<OrderDTO>(cartService.getCart());

    function handleClearClick() {
        cartService.clearCart();
        setCart(cartService.getCart());
    }

    function handleIncreaseItemClick(productId: number) {
        cartService.increaseItem(productId);
        setCart(cartService.getCart());
    }

    function handleDecreaseItemClick(productId: number) {
        cartService.decreaseItem(productId);
        setCart(cartService.getCart());
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
                    <ButtomPrimary buttonTitle="Finalizar pedido" />
                    <NavLink to="/catalog">
                        <ButtomInverse buttonTitle="Continuar comprando" />
                    </NavLink>
                    <div onClick={handleClearClick}>
                        <ButtomClearCart buttonTitle="Limpar carrinho" />
                    </div>
                </div>
            </section>
        </main >
    );
}