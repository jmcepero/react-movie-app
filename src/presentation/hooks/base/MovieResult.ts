import {Item} from '../../../domain/base/Item';

export interface SearchesResult {
  isLoading: boolean;
  pageLoading: boolean;
  result: Item[];
  page: number;
  error: string;
}
