import {
  IMobxHistory,
  IMobxLocation,
  IQueryParams,
} from 'mobx-location-history';
import { AnyObject } from 'mobx-vm-entities/utils/types';

/**
 * Описание конфигурации, по которой происходит навигация
 */
export type RouterToConfig = string | { pathname: string; search?: AnyObject };

export interface RouterPath {
  pathname: string;
  search: string;
  hash: string;
}

export interface RouterConfig {
  history?: IMobxHistory;
  location?: IMobxLocation;
  queryParams?: IQueryParams;
  abortSignal?: AbortSignal;
}

export type RouterNavigateParams = { replace?: boolean };
