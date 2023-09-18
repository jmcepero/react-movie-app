export interface WatchProvider {
  title: string;
  data: Provider[];
}

export interface Provider {
  logoPath: string;
  providerId: number;
  providerName: string;
  displayPriority: number;
}
