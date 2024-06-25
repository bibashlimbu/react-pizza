import { Link, useNavigate } from "react-router-dom";

function ButtonLink({ children, to }) {
  const navigate = useNavigate();
  const className =
    "hover:text text-sm text-blue-500 transition-all delay-150 hover:text-blue-600 hover:underline font-semibold";

  if (to === -1)
    return (
      <button className={className} onClick={() => navigate(to)}>
        {children}
      </button>
    );

  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

export default ButtonLink;
