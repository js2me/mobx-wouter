import { AbstractViewModel } from 'mobx-vm-entities';

import { PageViewModel } from './page-view-model';

export class PageViewModelImpl<
    Params extends Record<string, string> = Record<string, string>,
  >
  extends AbstractViewModel<Params>
  implements PageViewModel<Params>
{
  protected getParentViewModel(): null {
    return null;
  }

  get pathParams() {
    return this.payload as Params;
  }
}
