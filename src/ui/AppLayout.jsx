import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../feature/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] ">
      {isLoading && <Loader />}

      <Header />
      <main className=" overflow-y-scroll ">
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;