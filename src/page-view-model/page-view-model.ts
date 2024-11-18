import { ViewModel } from 'mobx-vm-entities';

export interface PageViewModel<
  Params extends Record<string, string> = Record<string, string>,
  ParentViewModel extends ViewModel<any> = ViewModel<any, any>,
> extends ViewModel<Params, ParentViewModel> {
  pathParams: Params;
}
