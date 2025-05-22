import {
  IQueryParams,
  History,
  QueryParams,
  buildSearchString,
  AnyHistory,
} from 'mobx-location-history';
import { startTransition } from 'react';

import {
  IRouter,
  RouterConfig,
  RouterNavigateParams,
  RouterPath,
  RouterToConfig,
  RouterType,
} from './router.types.js';

export class Router<THistory extends AnyHistory = AnyHistory>
  implements IRouter<THistory>
{
  history: THistory;
  location: THistory['location'];
  queryParams: IQueryParams;
  baseUrl: string | undefined;
  type: RouterType;

  constructor(protected config: RouterConfig<THistory>) {
    this.baseUrl = config.baseUrl;
    this.type = config.type ?? 'browser';
    this.history =
      config.history ??
      (new History({
        abortSignal: config.abortSignal,
      }) as unknown as THistory);
    this.location = config.location ?? this.history.location;
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

  createUrl(to: RouterToConfig, type?: RouterType): string {
    const path = this.createPath(to);

    return [
      path.baseUrl,
      type === 'hash' ? '#' : '',
      path.pathname,
      path.hash && `#${path.hash}`,
      path.search,
    ].join('');
  }

  protected hashNavigate(to: RouterToConfig, options?: RouterNavigateParams) {
    const path = this.createPath(to);
    const url = this.createUrl(
      {
        ...path,
        // This is fixes bug with pathname endings /
        // If location.pathname is /test-foo then after navigation to /test-foo#bar
        // navigation back will not work
        // If location.pathname is /test-foo/ then after navigation to /test-foo/#/bar
        // navigation back will not work
        baseUrl: this.location.pathname,
      },
      this.type,
    );
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
    const url = this.createUrl(path, this.type);
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
    if (this.type === 'hash') {
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

export const createRouter = <THistory extends AnyHistory>(
  config: RouterConfig<THistory>,
) => new Router<THistory>(config);
