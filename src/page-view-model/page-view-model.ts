import { AnyViewModel, ViewModel } from 'mobx-view-model';
import type { EmptyObject } from 'yummies/utils/types';

import { AnyPathParams } from './page-view-model.types.js';

export interface PageViewModel<
  Params extends AnyPathParams = EmptyObject,
  ParentViewModel extends AnyViewModel | null = null,
> extends ViewModel<Params, ParentViewModel> {
  pathParams: Params;
}
