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

### [`Router`](src/router/router.ts)   

Router for client navigation  

### Usage   

```ts
const history = createBrowserHistory();
// const history = createMemoryHistory();
// const history = createHashHistory();

const router = createRouter({
  history,
  // baseUrl
  // abortSignal
  // useStartViewTransition
  queryParams: createQueryParams({
    history,
  }),
});

```


### [`createBrowserHistory`, `createQueryParams` and etc](https://js2me.github.io/mobx-location-history)  

Exports from [mobx-location-history](https://js2me.github.io/mobx-location-history)  


### [`PageViewModelBase`](src/page-view-model/page-view-model.base.ts), [`PageViewModel`](src/page-view-model/page-view-model.ts)   

Simple [`ViewModel`](https://js2me.github.io/mobx-view-model/api/view-models/interface.html) wrapper for pages  

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

