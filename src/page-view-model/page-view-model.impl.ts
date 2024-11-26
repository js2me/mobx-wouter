import { AnyViewModel, ViewModelImpl } from 'mobx-vm-entities';

import { PageViewModel } from './page-view-model';

export class PageViewModelImpl<
    Params extends Record<string, string> = Record<string, string>,
    ParentViewModel extends AnyViewModel | null = null,
  >
  extends ViewModelImpl<Params, ParentViewModel>
  implements PageViewModel<Params, ParentViewModel>
{
  get pathParams() {
    return this.payload as Params;
  }
}
