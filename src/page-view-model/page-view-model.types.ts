import { PageViewModel } from './page-view-model';

export type AnyPageViewModel = PageViewModel<any, any>;

export type AnyPathParams = Partial<Record<string, string | undefined>>;
