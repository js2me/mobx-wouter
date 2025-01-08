import {
  IMobxHistory,
  IMobxLocation,
  IQueryParams,
  MobxHistory,
  MobxLocation,
  QueryParams,
  buildSearchString,
} from 'mobx-location-history';
import { startTransition } from 'react';

import {
  IMobxRouter,
  RouterConfig,
  RouterNavigateParams,
  RouterPath,
  RouterToConfig,
  RouterType,
} from './router.types';

export class MobxRouter implements IMobxRouter {
  history: IMobxHistory;
  location: IMobxLocation;
  queryParams: IQueryParams;
  baseUrl: string | undefined;
  type: RouterType;

  constructor(protected config: RouterConfig) {
    this.baseUrl = config.baseUrl;
    this.type = config.type ?? 'browser';
    this.history = config.history ?? new MobxHistory(config.abortSignal);
    this.location =
      config.location ?? new MobxLocation(this.history, config.abortSignal);
    this.queryParams =
      config.queryParams ?? new QueryParams(this.location, this.history);
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
        baseUrl: this.location.pathname,
      },
      this.type,
    );
    const state = options?.state ?? null;

    this.wrapInViewTransition(() => {
      this.location.hash = `#${path.pathname || '/'}`;
      this.history.replaceState(state, '', url);
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
        this.history.replaceState(state, '', url);
      } else {
        this.history.pushState(state, '', url);
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
