import { History, IQueryParams } from 'mobx-location-history';

export interface IRouter<THistory extends History = History> {
  history: THistory;
  location: THistory['location'];
  queryParams: IQueryParams;

  /**
   * The base URL of the router.
   * !!! Works only for "browser" router type
   */
  baseUrl?: string;

  /**
   * Creates a {@link RouterPath} object based on the route configuration.
   *
   * @param to - Route configuration including a path, search parameters and hash.
   * @returns A {@link RouterPath} object with pathname, search, and hash values.
   */
  createPath(to: RouterToConfig): RouterPath;

  /**
   * Creates a routing navigation URL based on the route configuration.
   *
   * @param to - Route configuration including a path and search parameters.
   * @param type - Url type which to create url
   * @returns A formed URL as a string.
   */
  createUrl(to: RouterToConfig, type?: RouterType): string;

  /**
   * Navigation through the application.
   */
  navigate(to: RouterToConfig, options?: RouterNavigateParams): void;

  back(): void;
}

/**
 * @deprecated use `IRouter` instead.
 * This type will be removed in next major release
 */
export type IMobxRouter = IRouter<History>;

export interface RouterPath {
  baseUrl: string;
  pathname: string;
  search: string;
  hash: string;
}

/**
 * Описание конфигурации, по которой происходит навигация
 */
export type RouterToConfig =
  | string
  | RouterPath
  | { pathname: string; search?: Record<string, any> };

export type RouterType = 'browser' | 'hash';

export interface RouterConfig<THistory extends History = History> {
  history?: THistory;
  queryParams?: IQueryParams;
  abortSignal?: AbortSignal;
  /**
   * @deprecated use provided {history} (createBrowserHistory, createHashHistory)
   */
  type?: RouterType;
  baseUrl?: string;
  /**
   * experimental feature
   * Navigation will use https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition
   */
  useStartViewTransition?: boolean;
}

export type RouterNavigateParams = {
  replace?: boolean;
  state?: any;
  /**
   * experimental feature
   * Navigation will use https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition
   */
  useStartViewTransition?: boolean;
};
