import { AnyViewModel, ViewModel } from 'mobx-vm-entities';
import { EmptyObject } from 'mobx-vm-entities/utils/types';

export interface PageViewModel<
  Params extends Record<string, string> = EmptyObject,
  ParentViewModel extends AnyViewModel | null = null,
> extends ViewModel<Params, ParentViewModel> {
  pathParams: Params;
}
