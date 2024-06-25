import { Link } from "react-router-dom";
import SearchOrder from "../feature/order/SearchOrder";
import UserName from "../feature/user/UserName";

function Header() {
  return (
    <header className="flex items-center justify-between bg-amber-400 px-4 py-2 sm:px-6">
      <Link
        to="/"
        className=" text-sm font-bold uppercase tracking-widest sm:text-xl"
      >
        Fast-React-pizza
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
