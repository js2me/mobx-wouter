import { AnyViewModel, ViewModel } from 'mobx-vm-entities';
import { EmptyObject } from 'mobx-vm-entities/utils/types';

import { AnyPathParams } from './page-view-model.types';

export interface PageViewModel<
  Params extends AnyPathParams = EmptyObject,
  ParentViewModel extends AnyViewModel | null = null,
> extends ViewModel<Params, ParentViewModel> {
  pathParams: Params;
}
