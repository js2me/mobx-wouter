import { IMobxHistory, IMobxLocation } from 'mobx-location-history';

export interface IMobxRouter {
  history: IMobxHistory;
  location: IMobxLocation;
}
