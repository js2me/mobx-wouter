import {
  LazyViewAndModel,
  ViewModelHocConfig,
  withLazyViewModel,
} from 'mobx-vm-entities';
import { AnyObject } from 'mobx-vm-entities/utils/types';
import { ComponentType } from 'react';
import { LoadableMixin } from 'react-simple-loadable/loadable';

import { AnyPageViewModel, PageViewModel } from '../page-view-model';

import {
  ComponentWithPageViewModel,
  PageViewModelProps,
} from './with-page-view-model';

export type ComponentWithLazyPageViewModel<
  TViewModel extends AnyPageViewModel,
  TComponentOriginProps extends AnyObject = PageViewModelProps<TViewModel>,
> = ComponentWithPageViewModel<TViewModel, TComponentOriginProps> &
  LoadableMixin;

export function withLazyPageViewModel<
  TViewModel extends PageViewModel<any, any>,
  TView extends ComponentType<any>,
>(
  loadFunction: () => Promise<LazyViewAndModel<TViewModel, TView>>,
  config?: ViewModelHocConfig<any>,
): ComponentWithLazyPageViewModel<TViewModel, TView> {
  return withLazyViewModel(loadFunction, {
    ...config,
    getPayload: config?.getPayload ?? ((props) => props.params),
  }) as unknown as ComponentWithLazyPageViewModel<TViewModel, TView>;
}
