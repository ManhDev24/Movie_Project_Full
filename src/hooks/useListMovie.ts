import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { movieApi } from "../apis/movie.api";
import { DataListMovie } from "../interface/movie.interface";

type useListMovieOption = Omit<UndefinedInitialDataOptions<DataListMovie>, 'queryKey'|'queryFn'>;

export const useListMovie = (currentPage:number, options?:useListMovieOption) => {
  const queryResult = useQuery({
    queryKey: ["list-movie", { currentPage }],
    queryFn: () => movieApi.listMovie<DataListMovie>({ page: currentPage }),
    ...options,
  });
  return queryResult;
}

