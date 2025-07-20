import {
  LazyViewAndModel,
  LazyViewModelHocConfig,
  withLazyViewModel,
} from 'mobx-view-model';
import { ComponentProps, ComponentType } from 'react';
import type { LoadableConfig, LoadableMixin } from 'react-simple-loadable';
import { MaybePromise } from 'yummies/utils/types';

import { AnyPageViewModel, PageViewModel } from '../page-view-model/index.js';
import { createPageVmHocConfig } from '../utils/create-page-vm-hoc-config.js';

import { ComponentWithPageViewModel } from './with-page-view-model.js';

export type ComponentWithLazyPageViewModel<
  TViewModel extends AnyPageViewModel,
  TView extends ComponentType<any>,
> = ComponentWithPageViewModel<TViewModel, ComponentProps<TView>> &
  LoadableMixin;

export function withLazyPageViewModel<
  TViewModel extends PageViewModel<any, any>,
  TView extends ComponentType<any>,
>(
  loadFunction: () => MaybePromise<LazyViewAndModel<TViewModel, TView>>,
  configOrFallbackComponent?:
    | LazyViewModelHocConfig<NoInfer<TViewModel>>
    | LoadableConfig['loading'],
): ComponentWithLazyPageViewModel<TViewModel, TView> {
  let config: LazyViewModelHocConfig<any>;

  if (typeof configOrFallbackComponent === 'function') {
    config = createPageVmHocConfig({
      fallback: configOrFallbackComponent,
    });
  } else {
    config = createPageVmHocConfig(configOrFallbackComponent);
  }

  return withLazyViewModel(
    loadFunction,
    config,
  ) as unknown as ComponentWithLazyPageViewModel<TViewModel, TView>;
}
