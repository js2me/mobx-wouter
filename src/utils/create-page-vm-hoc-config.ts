import { ViewModelHocConfig } from 'mobx-view-model';
import { Maybe } from 'yummies/utils/types';

export const createPageVmHocConfig = (
  existedConfig: Maybe<ViewModelHocConfig<any>>,
): ViewModelHocConfig<any> => {
  const config = { ...existedConfig };
  config.getPayload ??= (props) => props.params;
  return config;
};
