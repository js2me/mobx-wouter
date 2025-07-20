import {
  AnyViewModel,
  ViewModelHocConfig,
  ViewModelInputProps,
  ViewModelProps,
  withViewModel,
} from 'mobx-view-model';
import { ComponentType, ReactNode } from 'react';
import type { AnyObject, Class, RenameKey } from 'yummies/utils/types';

import { createPageVmHocConfig } from '../utils/create-page-vm-hoc-config.js';

export type PageViewModelProps<VM extends AnyViewModel> = ViewModelProps<VM>;

export type ComponentWithPageViewModel<
  TViewModel extends AnyViewModel,
  TComponentOriginProps extends AnyObject = ViewModelProps<TViewModel>,
> = (
  props: Omit<TComponentOriginProps, 'model'> &
    RenameKey<ViewModelInputProps<TViewModel>, 'payload', 'params'>,
) => ReactNode;

export function withPageViewModel<
  TViewModel extends AnyViewModel,
  TComponentOriginProps extends AnyObject = PageViewModelProps<TViewModel>,
>(
  model: Class<TViewModel>,
  component: ComponentType<
    TComponentOriginProps & PageViewModelProps<TViewModel>
  >,
  config?: ViewModelHocConfig<TViewModel>,
): ComponentWithPageViewModel<TViewModel, TComponentOriginProps>;

export function withPageViewModel<TViewModel extends AnyViewModel>(
  model: Class<TViewModel>,
  config?: ViewModelHocConfig<TViewModel>,
): <TComponentOriginProps extends AnyObject = PageViewModelProps<TViewModel>>(
  Component?: ComponentType<
    TComponentOriginProps & PageViewModelProps<TViewModel>
  >,
) => ComponentWithPageViewModel<TViewModel, TComponentOriginProps>;

export function withPageViewModel(...args: any[]): any {
  if (typeof args[1] === 'function') {
    return withViewModel(args[0], args[1], createPageVmHocConfig(args[2]));
  } else {
    return withViewModel(args[0], createPageVmHocConfig(args[1]));
  }
}
