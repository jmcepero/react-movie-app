import {useEffect, useState} from 'react';
import {WatchProvider} from '../../domain/watch_providers/entities/WatchProviders';
import {getWatchProviderUseCase} from '../../domain/watch_providers/usecases/GetWatchProvidersUseCase';
import {errorHandler} from '../base/errorHandler';

interface WatchProviderState {
  isLoading: boolean;
  watchProvider: WatchProvider[];
  error: string;
}

interface WatchProviderParams {
  itemId: string;
  itemType: string;
}

const initialWatchProviderState: WatchProviderState = {
  isLoading: false,
  watchProvider: [],
  error: '',
};

export const useWatchProvider = (params: WatchProviderParams) => {
  const [watchProviderState, setWatchProviderState] =
    useState<WatchProviderState>(initialWatchProviderState);

  useEffect(() => {
    getWatchProvider(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const getWatchProvider = async ({itemId, itemType}: WatchProviderParams) => {
    const getWatchProviders = getWatchProviderUseCase.execute(itemId, itemType);

    setWatchProviderState({
      ...watchProviderState,
      isLoading: true,
    });

    try {
      const result = await getWatchProviders;
      setWatchProviderState({
        isLoading: false,
        watchProvider: result,
        error: '',
      });
    } catch (error) {
      const {message} = errorHandler(error);
      setWatchProviderState({
        isLoading: false,
        watchProvider: [],
        error: message,
      });
    }
  };

  return {
    ...watchProviderState,
  };
};
