import { AnyViewModel, ViewModelBase } from 'mobx-view-model';
import type { EmptyObject } from 'yummies/utils/types';

import { PageViewModel } from './page-view-model.js';
import { AnyPathParams } from './page-view-model.types.js';

export class PageViewModelBase<
    Params extends AnyPathParams = EmptyObject,
    ParentViewModel extends AnyViewModel | null = null,
  >
  extends ViewModelBase<Params, ParentViewModel>
  implements PageViewModel<Params, ParentViewModel>
{
  get pathParams() {
    return this.payload as Params;
  }
}
