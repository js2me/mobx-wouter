<img src="assets/logo.png" align="right" height="156" alt="logo" />

# mobx-wouter  

[![NPM version][npm-image]][npm-url] [![test status][github-test-actions-image]][github-actions-url] [![build status][github-build-actions-image]][github-actions-url] [![npm download][download-image]][download-url] [![bundle size][bundlephobia-image]][bundlephobia-url]


[npm-image]: http://img.shields.io/npm/v/mobx-wouter.svg
[npm-url]: http://npmjs.org/package/mobx-wouter
[github-build-actions-image]: https://github.com/js2me/mobx-wouter/workflows/Build/badge.svg
[github-test-actions-image]: https://github.com/js2me/mobx-wouter/workflows/Test/badge.svg
[github-actions-url]: https://github.com/js2me/mobx-wouter/actions
[download-image]: https://img.shields.io/npm/dm/mobx-wouter.svg
[download-url]: https://npmjs.org/package/mobx-wouter
[bundlephobia-url]: https://bundlephobia.com/result?p=mobx-wouter
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/mobx-wouter

_**MobX** integration with **Wouter**_


## What package has   

### [`PageViewModelBase`](src/page-view-model/page-view-model.base.ts), [`PageViewModel`](src/page-view-model/page-view-model.ts)   

Simple [`ViewModel`](https://github.com/js2me/mobx-view-model?tab=readme-ov-file#mobx-view-model) wrapper for pages  

#### Usage:  

```ts
import { PageViewModelBase } from 'mobx-wouter';

class HomePageVM extends PageViewModelBase<{ pathParam: string }> {
  @observable
  accessor value = 'value';

  mount() {
    super.mount();
    document.title = 'Home';
    // do something
  }
}
```


### [`withPageViewModel()`](src/page-view-model/with-page-view-model.tsx)  

HOC for integration `PageViewModel` with view component of **React**  

#### Usage:  

```tsx
import { ViewModelProps } from 'mobx-view-model';  
import { withPageViewModel } from 'mobx-wouter';

const HomePageView = observer(({ model }: ViewModelProps<HomePageVM>) => {
  return <div>{`render value - ${model.value}`}</div>
})

export const HomePage = withPageViewModel(HomePageVM)(HomePageView);
```

### [`withLazyPageViewModel()`](src/page-view-model/with-lazy-page-view-model.tsx)  

Same as [`withPageViewModel()`](src/page-view-model/with-page-view-model.tsx) but with lazy loading view and view model  

### [`MobxRouter`](src/router/router.ts)   

Router for client navigation  

### [`MobxLocation`, `MobxHistory`, `QueryParams` and etc](https://github.com/js2me/mobx-location-history)  

Exports from [mobx-location-history](https://github.com/js2me/mobx-location-history)  


### Usage   

```ts
import { MobxRouter, MobxLocation, MobxHistory, QueryParams } from "mobx-wouter";

const router = new MobxRouter({
  history: //, new MobxLocation()
  location: //, new MobxHistory()
  queryParams: //, new QueryParams(),
  abortSignal: //
})
```