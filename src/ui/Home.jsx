import { useSelector } from "react-redux";
import CreateUser from "../feature/user/CreateUser";
import Button from "./Button";

function Home() {
  const userName = useSelector((state) => state.user.userName);
  return (
    <div className="my-4 text-center">
      <h1 className=" mb-8 text-xl  font-bold text-amber-500">
        <span className="text-black">The best pizza.</span>
        <br />
        Straight out of the oven, straight to you.
      </h1>
      {userName === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue ordering {userName}
        </Button>
      )}
    </div>
  );
}

export default Home;
