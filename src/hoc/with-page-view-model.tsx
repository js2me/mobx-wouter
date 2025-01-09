import {
  AnyViewModel,
  ViewModelHocConfig,
  ViewModelInputProps,
  ViewModelProps,
  withViewModel,
} from 'mobx-vm-entities';
import { AnyObject, Class, RenameKey } from 'mobx-vm-entities/utils/types';
import { ComponentType, ReactNode } from 'react';

import type { AnyPageViewModel } from '../page-view-model';

export type PageViewModelProps<TPageVM extends AnyPageViewModel> =
  ViewModelProps<TPageVM>;

export type ComponentWithPageViewModel<
  TViewModel extends AnyViewModel,
  TComponentOriginProps extends AnyObject = ViewModelProps<TViewModel>,
> = (
  props: Omit<TComponentOriginProps, 'model'> &
    RenameKey<ViewModelInputProps<TViewModel>, 'payload', 'params'>,
) => ReactNode;

export function withPageViewModel<TViewModel extends AnyPageViewModel>(
  model: Class<TViewModel>,
  config?: ViewModelHocConfig<TViewModel>,
): <TComponentOriginProps extends AnyObject = ViewModelProps<TViewModel>>(
  Component?: ComponentType<TComponentOriginProps & ViewModelProps<TViewModel>>,
) => ComponentWithPageViewModel<TViewModel, TComponentOriginProps>;

export function withPageViewModel<TViewModel extends AnyPageViewModel>(
  model: Class<TViewModel>,
  config?: ViewModelHocConfig<any>,
) {
  return withViewModel(model, {
    ...config,
    getPayload: config?.getPayload ?? ((props) => props.params),
  });
}
