import {
  IMobxHistory,
  IMobxLocation,
  IQueryParams,
  MobxHistory,
  MobxLocation,
  QueryParams,
  buildSearchString,
} from 'mobx-location-history';

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

  navigate(to: RouterToConfig, options?: RouterNavigateParams): void {
    const path = this.createPath(to);
    const url = this.createUrl(path);

    if (this.type === 'hash') {
      this.location.hash = path.hash;
    }

    if (options?.replace) {
      this.history.replaceState(null, '', url);
    } else {
      this.history.pushState(null, '', url);
    }
  }

  back() {
    this.history.back();
  }

  createPath(to: RouterToConfig): RouterPath {
    if (typeof to === 'object' && 'hash' in to) {
      return to;
    }
    if (typeof to === 'string') {
      const [rawPathname, search] = to.split('?', 2);
      const [pathname, hash] = rawPathname.split('#', 2);

      return {
        pathname,
        search: search ? `?${search}` : '',
        hash: hash || '',
      };
    } else {
      const [pathname, hash] = to.pathname.split('#', 2);
      return {
        pathname,
        search: buildSearchString(to.search || {}),
        hash: hash || '',
      };
    }
  }

  createUrl(to: RouterToConfig): string {
    const path = this.createPath(to);

    let url = `${path.pathname}${path.hash ? `#${path.hash}` : ''}${path.search}`;

    if (this.baseUrl && this.baseUrl !== '/') {
      url = `${this.baseUrl}${url}`;
    }

    return url;
  }
}
