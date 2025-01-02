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
   * The base URL of the router.
   */
  baseUrl?: string;

  /**
   * The type of the router, either 'browser' or 'hash'.
   */
  type: RouterType;

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
export type RouterToConfig =
  | string
  | RouterPath
  | { pathname: string; search?: AnyObject };

export interface RouterPath {
  pathname: string;
  search: string;
  hash: string;
}

export type RouterType = 'browser' | 'hash';

export interface RouterConfig {
  history?: IMobxHistory;
  location?: IMobxLocation;
  queryParams?: IQueryParams;
  abortSignal?: AbortSignal;
  type?: RouterType;
  baseUrl?: string;
}

export type RouterNavigateParams = { replace?: boolean };
