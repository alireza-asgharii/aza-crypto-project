import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchCoinsMarket } from "../services/queries";

export const useGetCoinsMarket = (page) => {
  const res = useQuery({
    queryKey: ["coinsMarket", page || 1],
    queryFn: () => fetchCoinsMarket(page),
    placeholderData: keepPreviousData,
    refetchInterval: 1 * 60 * 1000,
  });

  return res;
};
