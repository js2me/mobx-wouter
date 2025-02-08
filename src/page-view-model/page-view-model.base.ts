import { AnyViewModel, ViewModelBase } from 'mobx-view-model';
import { EmptyObject } from 'mobx-view-model/utils/types';

import { PageViewModel } from './page-view-model';
import { AnyPathParams } from './page-view-model.types';

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
