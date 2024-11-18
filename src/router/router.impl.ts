import {
  IMobxHistory,
  IMobxLocation,
  MobxHistory,
  MobxLocation,
} from 'mobx-location-history';

import { IMobxRouter } from './router';
import { RouterConfig } from './router.types';

export class MobxRouter implements IMobxRouter {
  history: IMobxHistory;
  location: IMobxLocation;

  constructor(protected config: RouterConfig) {
    this.history = config.history ?? new MobxHistory();
    this.location = config.location ?? new MobxLocation(this.history);
  }
}
