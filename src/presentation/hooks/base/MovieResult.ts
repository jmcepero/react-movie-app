import {Item} from '../../../domain/base/Item';

export interface MovieResult {
  isLoading: boolean;
  pageLoading: boolean;
  result: Item[];
  page: number;
  error: string;
}
