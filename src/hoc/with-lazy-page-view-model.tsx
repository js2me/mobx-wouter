import {
  LazyViewAndModel,
  ViewModelHocConfig,
  withLazyViewModel,
} from 'mobx-vm-entities';
import { ComponentType } from 'react';

import { PageViewModel } from '../page-view-model';

export const withLazyPageViewModel = <
  TViewModel extends PageViewModel<any, any>,
  TView extends ComponentType<any>,
>(
  loadFunction: () => Promise<LazyViewAndModel<TViewModel, TView>>,
  config?: ViewModelHocConfig<any>,
) => {
  return withLazyViewModel(loadFunction, config);
};
