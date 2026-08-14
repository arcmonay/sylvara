import { CartView } from "@/components/CartView";

export const metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <div className="wrap page-hero">
      <h1>Cart</h1>
      <CartView />
    </div>
  );
}
