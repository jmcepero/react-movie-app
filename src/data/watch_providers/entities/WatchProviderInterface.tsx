// Generated by https://quicktype.io
export interface WatchProvidersResponse {
    id:      number;
    results?: ProviderCountryKeyResponse;
}

export interface ProviderCountryKeyResponse {
    US?: ServiceTypeResponse,
    CL?: ServiceTypeResponse
}

export interface ServiceTypeResponse {
    link:      string;
    rent?:     ProviderResponse[];
    buy?:       ProviderResponse[];
    flatrate?: ProviderResponse[];
}

export interface ProviderResponse {
    logo_path:        string;
    provider_id:      number;
    provider_name:    string;
    display_priority: number;
}