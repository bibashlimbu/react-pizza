import { useSelector } from "react-redux";

function UserName() {
  const userName = useSelector((state) => state.user.userName);

  if (!userName) return;
  return <div className="hidden font-semibold md:block">{userName}</div>;
}

export default UserName;
