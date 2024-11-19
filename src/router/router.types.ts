import {
  IMobxHistory,
  IMobxLocation,
  IQueryParams,
} from 'mobx-location-history';
import { AnyObject } from 'mobx-vm-entities/utils/types';

export interface IMobxRouter {
  history: IMobxHistory;
  location: IMobxLocation;
  queryParams: IQueryParams;

  /**
   * Creates a {@link RouterPath} object based on the route configuration.
   *
   * @param to - Route configuration including a path, search parameters and hash.
   * @returns A {@link RouterPath} object with pathname, search, and hash values.
   */
  createPath(to: RouterToConfig): RouterPath;

  /**
   * Creates a URL based on the route configuration.
   *
   * @param to - Route configuration including a path and search parameters.
   * @returns A formed URL as a string.
   */
  createUrl(to: RouterToConfig): string;

  /**
   * Navigation through the application.
   */
  navigate(to: RouterToConfig, options?: RouterNavigateParams): void;

  back(): void;
}

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
