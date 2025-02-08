import { AnyViewModel, ViewModel } from 'mobx-view-model';
import { EmptyObject } from 'mobx-view-model/utils/types';

import { AnyPathParams } from './page-view-model.types';

export interface PageViewModel<
  Params extends AnyPathParams = EmptyObject,
  ParentViewModel extends AnyViewModel | null = null,
> extends ViewModel<Params, ParentViewModel> {
  pathParams: Params;
}
