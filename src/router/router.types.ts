import { IMobxHistory, IMobxLocation } from 'mobx-location-history';

export interface RouterConfig {
  history?: IMobxHistory;
  location?: IMobxLocation;
}
