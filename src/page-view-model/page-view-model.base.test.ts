import { AnyViewModel } from 'mobx-view-model';
import { EmptyObject } from 'mobx-view-model/utils/types';
import { describe, expect, test } from 'vitest';

import { PageViewModelBase } from './page-view-model.base';
import { AnyPathParams } from './page-view-model.types';

export class PageViewModelBaseMock<
  Params extends AnyPathParams = EmptyObject,
  ParentViewModel extends AnyViewModel | null = null,
> extends PageViewModelBase<Params, ParentViewModel> {}

describe.skip('PageViewModelBase', () => {
  test.skip('renders', () => {
    expect(true).toBe(true);
  });
});
