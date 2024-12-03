<img src="assets/logo.png" align="right" height="156" alt="logo" />

# mobx-wouter  

_**MobX** integration with **Wouter**_


## What package has   

### [`PageViewModelImpl`](src/page-view-model/page-view-model.impl.ts), [`PageViewModel`](src/page-view-model/page-view-model.ts)   

Simple [`ViewModel`](https://github.com/js2me/mobx-vm-entities?tab=readme-ov-file#mobx-view-model) wrapper for pages  


### [`withPageViewModel()`](src/page-view-model/with-page-view-model.tsx)  

HOC for integration `PageViewModel` with view component of **React**  

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