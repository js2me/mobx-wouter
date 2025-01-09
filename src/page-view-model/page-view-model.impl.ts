import { AnyViewModel, ViewModelImpl } from 'mobx-vm-entities';
import { EmptyObject } from 'mobx-vm-entities/utils/types';

import { PageViewModel } from './page-view-model';
import { AnyPathParams } from './page-view-model.types';

export class PageViewModelImpl<
    Params extends AnyPathParams = EmptyObject,
    ParentViewModel extends AnyViewModel | null = null,
  >
  extends ViewModelImpl<Params, ParentViewModel>
  implements PageViewModel<Params, ParentViewModel>
{
  get pathParams() {
    return this.payload as Params;
  }
}
