import {
  IMobxHistory,
  IMobxLocation,
  IQueryParams,
} from 'mobx-location-history';

import {
  RouterNavigateParams,
  RouterPath,
  RouterToConfig,
} from './router.types';

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
}
