import {
  Provider,
  WatchProvider,
} from '../../../domain/watch_providers/entities/WatchProviders';
import {
  WatchProviderByMovieResponse,
  WatchProvidersResponse,
} from '../entities/WatchProviderInterface';

export const POPULAR_CHILE_PROVIDERS = [
  2, // Apple TV
  3, // Google Play Movies
  8, // Netflix
  9, // Amazon Prime Video
  337, // Disney+
  531, // Paramount+
  384, // HBO Max
  167, // Claro Video
  467, // DirecTV Go
];

export const watchProviderByItemIdToDomain = (
  watchProviderResponse: WatchProviderByMovieResponse,
): WatchProvider[] => {
  const result: WatchProvider[] = [];
  if (watchProviderResponse.results?.US?.buy !== undefined) {
    result.push({
      title: 'Buy',
      data: watchProviderResponse.results?.US?.buy.map(item => ({
        logoPath: item.logo_path,
        providerId: item.provider_id,
        providerName: item.provider_name,
        displayPriority: item.display_priority,
      })),
    });
  }

  if (watchProviderResponse.results?.US?.rent !== undefined) {
    result.push({
      title: 'Rent',
      data: watchProviderResponse.results?.US?.rent.map(item => ({
        logoPath: item.logo_path,
        providerId: item.provider_id,
        providerName: item.provider_name,
        displayPriority: item.display_priority,
      })),
    });
  }

  if (watchProviderResponse.results?.US?.flatrate !== undefined) {
    result.push({
      title: 'Flatrate',
      data: watchProviderResponse.results?.US?.flatrate.map(item => ({
        logoPath: item.logo_path,
        providerId: item.provider_id,
        providerName: item.provider_name,
        displayPriority: item.display_priority,
      })),
    });
  }

  return result;
};

export const watchProvidersToDomain = (
  watchProviderResponse: WatchProvidersResponse,
): Provider[] => {
  const result: Provider[] = watchProviderResponse.results
    .filter(value => {
      return POPULAR_CHILE_PROVIDERS.includes(value.provider_id);
    })
    .map(item => ({
      logoPath: item.logo_path,
      providerId: item.provider_id,
      providerName: item.provider_name,
      displayPriority: item.display_priority,
    }));

  return result;
};
