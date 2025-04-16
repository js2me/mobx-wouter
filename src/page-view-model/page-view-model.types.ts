import { PageViewModel } from './page-view-model.js';

export type AnyPageViewModel = PageViewModel<any, any>;

export type AnyPathParams = Partial<Record<string, string | undefined>>;
