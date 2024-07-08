import {useCallback, useEffect, useState} from 'react';
import {SearchesResult} from '../../../hooks/base/MovieResult';
import {findMoviesUseCase} from '../../../../domain/movie/usecases/FindMoviesUseCase';
import {errorHandler} from '../../../base/errorHandler';
import {findTVShowUseCase} from '../../../../domain/tv_shows/usecases/FindTVShowUseCase';
import {findPeoplesUseCase} from '../../../../domain/people/usecases/FindPeoplesUseCase';

export interface SearchParams {
  term: string;
  page: number;
}

const initialSearchState: SearchesResult = {
  isLoading: false,
  pageLoading: false,
  result: [],
  page: 1,
  error: '',
};

export const useSearches = (selectedChipDefault: number) => {
  const [searchesState, setSearchesState] =
    useState<SearchesResult>(initialSearchState);
  const [term, setTerm] = useState('');
  const [selectedChip, setSelectedChip] = useState(selectedChipDefault);

  const searchByTerm = async () => {
    setSearchesState(prevState => ({
      ...prevState,
      isLoading: prevState.page === 1,
      pageLoading: prevState.page > 1,
    }));
    try {
      const searchFunction = getSearchFunction(selectedChip);
      const data = await searchFunction(term, searchesState.page);
      setSearchesState(prevState => ({
        ...prevState,
        isLoading: false,
        pageLoading: false,
        result:
          prevState.page === 1
            ? data.results
            : [...prevState.result, ...data.results],
        page: prevState.page + 1,
        error: '',
      }));
    } catch (error) {
      const {message} = errorHandler(error);
      setSearchesState(prevState => ({
        ...prevState,
        isLoading: false,
        pageLoading: false,
        error: message,
      }));
    }
  };

  const handleTermChange = useCallback((value: string) => {
    setTerm(value);
  }, []);

  useEffect(() => {
    console.log('Search State ', searchesState.error, searchesState.page);
  }, [searchesState]);

  const resetState = () => {
    setSearchesState(_ => {
      return {...initialSearchState};
    });
  };

  useEffect(() => {
    if (term.length >= 3) {
      resetState();
      searchByTerm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, selectedChip]);

  const getSearchFunction = (chip: number) => {
    switch (chip) {
      case 0:
        return findMoviesUseCase.execute;
      case 1:
        return findTVShowUseCase.execute;
      case 2:
        return findPeoplesUseCase.execute;
      default:
        throw new Error('Invalid chip selected');
    }
  };

  return {
    term,
    handleTerm: handleTermChange,
    selectedChip,
    setSelectedChip,
    onReachToEnd: searchByTerm,
    ...searchesState,
  };
};
