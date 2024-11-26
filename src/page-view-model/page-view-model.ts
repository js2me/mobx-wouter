import { AnyViewModel, ViewModel } from 'mobx-vm-entities';

export interface PageViewModel<
  Params extends Record<string, string> = Record<string, string>,
  ParentViewModel extends AnyViewModel | null = null,
> extends ViewModel<Params, ParentViewModel> {
  pathParams: Params;
}
