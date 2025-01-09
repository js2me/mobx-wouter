import { AnyViewModel } from 'mobx-vm-entities';
import { EmptyObject } from 'mobx-vm-entities/utils/types';
import { describe, expect, test } from 'vitest';

import { PageViewModelImpl } from './page-view-model.impl';
import { AnyPathParams } from './page-view-model.types';

export class PageViewModelMock<
  Params extends AnyPathParams = EmptyObject,
  ParentViewModel extends AnyViewModel | null = null,
> extends PageViewModelImpl<Params, ParentViewModel> {}

describe.skip('PageViewModelImpl', () => {
  test.skip('renders', () => {
    expect(true).toBe(true);
  });
});
