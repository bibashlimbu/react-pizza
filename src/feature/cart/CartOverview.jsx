import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);
  if (!totalQuantity) return null;
  return (
    <div className="flex items-center justify-between bg-stone-900 px-4 py-4 text-sm uppercase text-white sm:px-7 sm:text-base">
      <p className="space-x-3">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link
        to="/cart"
        className="transition-all duration-200 hover:text-yellow-400"
      >
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
