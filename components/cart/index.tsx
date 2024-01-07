import { getCart } from "lib/shopify";
import { cookies } from "next/headers";
import CartDrawer from "./cart-drawer";

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  return (
    <CartDrawer cart={cart}/>
  )
}
