import { useDispatch } from "react-redux";
import { type CartItem, addToCart, removeFromCart } from "../store/cart-slice";
import { useCartSelector } from "../store/hooks";

export default function CartItems() {
  const cartItems = useCartSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  function handleRemoveFromCart(id: string) {
    dispatch(removeFromCart(id));
  }
  function handleAddToCart(item: CartItem) {
    dispatch(addToCart(item));
  }
  const totalPrice = cartItems.reduce(
    (valu, item) => valu + item.quantity * item.price,
    0
  );
  const formattedTotalPrice = totalPrice.toFixed(2);
  return (
    <div id="cart">
      {cartItems.length === 0 && <p>No items in cart!</p>}

      {cartItems.length > 0 && (
        <ul id="cart-items">
          {cartItems.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.title}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => handleRemoveFromCart(item.id)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleAddToCart(item)}>+</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p id="cart-total-price">
        Cart Total: <strong>${formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
