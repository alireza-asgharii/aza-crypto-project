import { useState } from "react";
import { useGetCoinsMarket } from "../../hooks/useQueries";
import { useSearchParams } from "react-router-dom";

const Spiner = () => {
  const [isLoading, setLoading] = useState(false);
  const [query] = useSearchParams();
  const { isFetching } = useGetCoinsMarket(query.get("page"));
  return (
    <>
      {isFetching && (
        <span className="w-4 h-4 border-3 border-t-blue-500 rounded-[50%] fixed top-3 right-2 animate-spin"></span>
      )}
    </>
  );
};

export default Spiner;
