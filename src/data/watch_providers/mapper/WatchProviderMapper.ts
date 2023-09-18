import {WatchProvider} from '../../../domain/watch_providers/entities/WatchProviders';
import {WatchProvidersResponse} from '../entities/WatchProviderInterface';

export const watchProviderResponseToDomain = (
  watchProviderResponse: WatchProvidersResponse,
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
