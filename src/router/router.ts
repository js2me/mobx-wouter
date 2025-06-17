import {
  History,
  IQueryParams,
  QueryParams,
  buildSearchString,
  createBrowserHistory,
  createHashHistory,
} from 'mobx-location-history';
import { startTransition } from 'react';

import {
  IRouter,
  RouterConfig,
  RouterNavigateParams,
  RouterPath,
  RouterToConfig,
} from './router.types.js';

export class Router<THistory extends History = History>
  implements IRouter<THistory>
{
  history: THistory;
  queryParams: IQueryParams;
  baseUrl: string | undefined;

  constructor(protected config: RouterConfig<THistory>) {
    this.baseUrl = config.baseUrl;
    this.history =
      config.history ?? (createBrowserHistory() as unknown as THistory);
    if (config.history) {
      this.history = config.history;
    } else if (config.type === 'hash') {
      this.history = createHashHistory() as unknown as THistory;
    } else {
      this.history = createBrowserHistory() as unknown as THistory;
    }

    this.queryParams =
      config.queryParams ?? new QueryParams({ history: this.history });
  }

  createPath(to: RouterToConfig): RouterPath {
    const baseUrl = !this.baseUrl || this.baseUrl === '/' ? '' : this.baseUrl;

    if (typeof to === 'string') {
      const [rawPathname, ...searchSegments] = to.split('?');
      const [pathname, ...hashSegments] = rawPathname.split('#');
      const search = searchSegments.join('?');
      const hash = hashSegments.join('#');

      return {
        baseUrl,
        pathname,
        search: search ? `?${search}` : '',
        hash: hash || '',
      };
    } else if ('baseUrl' in to) {
      return to;
    } else {
      return this.createPath(
        `${to.pathname}${buildSearchString(to.search || {})}`,
      );
    }
  }

  get location() {
    return this.history.location;
  }

  createUrl(to: RouterToConfig): string {
    const path = this.createPath(to);

    return [
      path.baseUrl,
      this.config.type === 'hash' ? '#' : '',
      path.pathname,
      path.hash && `#${path.hash}`,
      path.search,
    ].join('');
  }

  protected hashNavigate(to: RouterToConfig, options?: RouterNavigateParams) {
    const path = this.createPath(to);
    const url = this.createUrl({
      ...path,
      // This is fixes bug with pathname endings /
      // If location.pathname is /test-foo then after navigation to /test-foo#bar
      // navigation back will not work
      // If location.pathname is /test-foo/ then after navigation to /test-foo/#/bar
      // navigation back will not work
      baseUrl: this.location.pathname,
    });
    const state = options?.state ?? null;

    this.wrapInViewTransition(() => {
      this.location.hash = `#${path.pathname || '/'}`;
      this.history.replace(url, state);
    }, options?.useStartViewTransition);
  }

  protected browserNavigate(
    to: RouterToConfig,
    options?: RouterNavigateParams,
  ) {
    const path = this.createPath(to);
    const url = this.createUrl(path);
    const state = options?.state ?? null;

    this.wrapInViewTransition(() => {
      if (options?.replace) {
        this.history.replace(url, state);
      } else {
        this.history.push(url, state);
      }
    }, options?.useStartViewTransition);
  }

  protected lastViewTransition?: ViewTransition;

  protected wrapInViewTransition(
    action: () => void,
    useStartViewTransition?: boolean,
  ) {
    if (
      (useStartViewTransition ||
        (useStartViewTransition == null &&
          this.config.useStartViewTransition)) &&
      document.startViewTransition
    ) {
      if (this.lastViewTransition) {
        this.lastViewTransition.skipTransition();
      }
      this.lastViewTransition = document.startViewTransition(() => {
        startTransition(action);
      });
      this.lastViewTransition.finished.finally(() => {
        delete this.lastViewTransition;
      });
    } else {
      action();
    }
  }

  navigate(to: RouterToConfig, options?: RouterNavigateParams): void {
    if (this.config.type === 'hash') {
      this.hashNavigate(to, options);
    } else {
      this.browserNavigate(to, options);
    }
  }

  back() {
    this.history.back();
  }
}

/**
 * @deprecated Use `Router` instead.
 * This export will be removed in next major release
 */
export const MobxRouter = Router;

export const createRouter = <THistory extends History>(
  config: RouterConfig<THistory>,
) => new Router<THistory>(config);
