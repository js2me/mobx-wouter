import { AnyViewModel } from 'mobx-view-model';
import { describe, expect, test } from 'vitest';
import { EmptyObject } from 'yummies/utils/types';

import { PageViewModelBase } from './page-view-model.base.js';
import { AnyPathParams } from './page-view-model.types.js';

export class PageViewModelBaseMock<
  Params extends AnyPathParams = EmptyObject,
  ParentViewModel extends AnyViewModel | null = null,
> extends PageViewModelBase<Params, ParentViewModel> {}

describe.skip('PageViewModelBase', () => {
  test.skip('renders', () => {
    expect(true).toBe(true);
  });
});
