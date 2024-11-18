import {
  IMobxHistory,
  IMobxLocation,
  IQueryParams,
  MobxHistory,
  MobxLocation,
  QueryParams,
  buildSearchString,
} from 'mobx-location-history';

import { IMobxRouter } from './router';
import {
  RouterConfig,
  RouterNavigateParams,
  RouterPath,
  RouterToConfig,
} from './router.types';

export class MobxRouter implements IMobxRouter {
  history: IMobxHistory;
  location: IMobxLocation;
  queryParams: IQueryParams;

  constructor(protected config: RouterConfig) {
    this.history = config.history ?? new MobxHistory(config.abortSignal);
    this.location =
      config.location ?? new MobxLocation(this.history, config.abortSignal);
    this.queryParams =
      config.queryParams ?? new QueryParams(this.location, this.history);
  }

  navigate(to: RouterToConfig, options?: RouterNavigateParams): void {
    if (options?.replace) {
      this.history.replaceState(null, '', this.createUrl(to));
    } else {
      this.history.pushState(null, '', this.createUrl(to));
    }
  }

  createPath(to: RouterToConfig): RouterPath {
    if (typeof to === 'string') {
      const [pathname, search] = to.split('?', 2);

      return {
        pathname,
        search: search ? `?${search}` : '',
        hash: '',
      };
    } else {
      return {
        pathname: to.pathname,
        search: buildSearchString(to.search || {}),
        hash: '',
      };
    }
  }

  createUrl(to: RouterToConfig): string {
    const path = this.createPath(to);
    return `${path.pathname}${path.search}${path.hash}`;
  }
}
