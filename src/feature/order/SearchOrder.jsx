import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="search order#"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-40 rounded-full px-4 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring focus:ring-yellow-200 sm:w-60"
      />
    </form>
  );
}

export default SearchOrder;
