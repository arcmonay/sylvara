import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="wrap page-hero">
      <h1>Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
