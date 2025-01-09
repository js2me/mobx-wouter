import {
  LazyViewAndModel,
  ViewModelHocConfig,
  withLazyViewModel,
} from 'mobx-vm-entities';
import { LoadableMixin } from 'mobx-vm-entities/lib/react-simple-loadable';
import { ComponentProps, ComponentType } from 'react';

import { AnyPageViewModel, PageViewModel } from '../page-view-model';

import { ComponentWithPageViewModel } from './with-page-view-model';

export type ComponentWithLazyPageViewModel<
  TViewModel extends AnyPageViewModel,
  TView extends ComponentType<any>,
> = ComponentWithPageViewModel<TViewModel, ComponentProps<TView>> &
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
