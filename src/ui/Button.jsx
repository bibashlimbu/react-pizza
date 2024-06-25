import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "rounded-full bg-yellow-400  font-semibold uppercase transition-all duration-200 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2  ";

  const btnStyle = {
    primary: base + " px-4 py-3 sm:text-sm text-xs",
    small: base + "text-xs px-3 py-2",
    secondary:
      " px-4 py-3 sm:text-sm text-xs rounded-full bg-stone-300 font-semibold uppercase transition-all duration-300 hover:bg-stone-400 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2",
    round: base + "px-4 py-2",
  };

  if (to)
    return (
      <Link className={btnStyle[type]} to={to}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button className={btnStyle[type]} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );

  return (
    <button className={btnStyle[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
