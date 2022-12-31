import * as cartRepository from "../localstorage/cart-repository";
import { OrderDTO, OrderItemDTO } from "../models/order";
import { ProductDTO } from "../models/product";

export function saveCart(cart: OrderDTO) {
    cartRepository.save(cart);
}

export function getCart(): OrderDTO {
    return cartRepository.get();
}

export function addProduct(product: ProductDTO) {
    const cart = getCart();
    const item = cart.items.find(i => i.productId === product.id);

    if (!item) {
        cart.items.push(new OrderItemDTO(product.id, 1, product.name, product.price, product.imgUrl));
        cartRepository.save(cart);
    }
}

export function clearCart() {
    cartRepository.clear();
}

export function increaseItem(productId: number) {
    const cart = getCart();
    const item = cart.items.find(i => i.productId === productId);
    if (item) {
        item.quantity++;
        cartRepository.save(cart);
    }
}

export function decreaseItem(productId: number) {
    const cart = getCart();
    const item = cart.items.find(i => i.productId === productId);
    if (item) {
        item.quantity--;
        if (item.quantity < 1) cart.items = cart.items.filter(i => i.productId !== item.productId);
        cartRepository.save(cart);
    }
}