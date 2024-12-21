import { ViewModelHocConfig, withViewModel } from 'mobx-vm-entities';
import { Class } from 'mobx-vm-entities/utils/types';

import type { PageViewModel } from '../page-view-model';

export const withPageViewModel = <VM extends PageViewModel<any, any>>(
  model: Class<VM>,
  config?: Omit<ViewModelHocConfig<VM>, 'getPayload'>,
) => {
  return withViewModel(model, {
    ...config,
    getPayload: (props) => props.params,
  });
};
