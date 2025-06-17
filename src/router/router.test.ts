import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
  History,
  ObservableHistory,
} from 'mobx-location-history';
import { describe, expect, test, vi } from 'vitest';

import { Router } from './router.js';
import { RouterNavigateParams, RouterType } from './router.types.js';

type HistoryType = 'browser' | 'hash' | 'memory';

export const createMockHistory = (historyType: HistoryType) => {
  let localHistory: ObservableHistory<History>;

  switch (historyType) {
    case 'browser': {
      localHistory = createBrowserHistory();
      break;
    }
    case 'hash': {
      localHistory = createHashHistory();
      break;
    }
    case 'memory': {
      localHistory = createMemoryHistory();
      break;
    }
  }

  const spies = {
    push: vi.spyOn(localHistory, 'push'),
    replace: vi.spyOn(localHistory, 'replace'),
  };

  const clearMocks = () => {
    spies.push.mockClear();
    spies.replace.mockClear();
  };

  return {
    ...localHistory,
    spies,
    clearMocks,
  };
};

describe('router', () => {
  const historyTypes: HistoryType[] = ['browser', 'hash', 'memory'];

  const navigationUrls = [
    '/path/a/b/c',
    '/path/a/1?param1=value1#section1',
    '/path/b/2?param2=value2#section2',
    '/path/c/3?param3=value3&param4=value4#section3',
    '/path/d/4#section4',
    '/path/e/5?param5=value5#section5',
    '/path/f/6?param6=value6&param7=value7#section6',
    '/path/g/7?param8=value8#section7',
    '/path/h/8?param9=value9&param10=value10#section8',
    '/path/i/9#section9',
    '/path/j/10?param11=value11#section10',
    '/path/k/11?param12=value12&param13=value13#section11',
    '/path/l/12?param14=value14#section12',
    '/path/m/13?param15=value15&param16=value16#section13',
    '/path/n/14#section14',
    '/path/o/15?param17=value17&param18=value18#section15',
    '/path/p/16?param19=value19#section16',
    '/path/q/17?param20=value20&param21=value21#section17',
    '/path/r/18#section18',
    '/path/s/19?param22=value22&param23=value23#section19',
    '/path/t/20?param24=value24#section20',
    '/path/u/21?param25=value25&param26=value26#section21',
    '/path/v/22#section22',
    '/path/w/23?param27=value27&param28=value28#section23',
    '/path/x/24?param29=value29#section24',
    '/path/y/25?param30=value30&param31=value31#section25',
    '/another/path/z/?query=example&hash=hashValue',
  ] as const;

  interface NavigationTestParams {
    historyType: HistoryType;
    to: string;
    expectedSearch?: string;
    params?: RouterNavigateParams;
    baseUrl?: string;
    type?: RouterType;
  }

  const createSingleNavigationTest = ({
    historyType,
    to,
    expectedSearch,
    params,
    baseUrl,
    type: routerType,
  }: NavigationTestParams) => {
    let expectedHref: string;

    if (routerType === 'hash') {
      switch (historyType) {
        case 'browser': {
          expectedHref = `http://localhost:3000/#${baseUrl ?? ''}${to}`;
          break;
        }
        case 'hash': {
          expectedHref = `http://localhost:3000/#${baseUrl ?? ''}${to}`;
          break;
        }
        case 'memory': {
          expectedHref = `http://localhost:3000/#`;
          break;
        }
      }
    } else {
      switch (historyType) {
        case 'browser': {
          expectedHref = `http://localhost:3000${baseUrl ?? ''}${to}`;
          break;
        }
        case 'hash': {
          expectedHref = `http://localhost:3000/#${baseUrl ?? ''}${to}`;
          break;
        }
        case 'memory': {
          expectedHref = `http://localhost:3000/#`;
          break;
        }
      }
    }

    const testName = `${routerType ? `[router_type:${routerType}]/` : ''}to:${JSON.stringify(to)}${params == null ? '' : `;params: ${JSON.stringify(params)}`} --> ${expectedHref}`;

    let pushStateCalls: number;
    let replaceStateCalls: number;

    if (routerType === 'hash') {
      pushStateCalls = 0;
      replaceStateCalls = 0;
    } else {
      pushStateCalls = params?.replace ? 0 : 1;
      replaceStateCalls = params?.replace ? 1 : 0;
    }

    const testAction = routerType === 'hash' ? test.skip : test;

    testAction(testName, () => {
      const historyMock = createMockHistory(historyType);
      history.replaceState(null, '', '/');
      location.hash = '';
      historyMock.clearMocks();

      const mockRouter = new Router({
        history: historyMock,
        baseUrl,
        type: routerType,
      });

      mockRouter.navigate(to, params);

      expect(location.href).toBe(expectedHref);

      expect(historyMock.spies.push).toHaveBeenCalledTimes(pushStateCalls);
      expect(historyMock.spies.replace).toHaveBeenCalledTimes(
        replaceStateCalls,
      );

      if (expectedSearch != null) {
        expect(location.search).toBe(expectedSearch);
      }
      if (params?.state != null) {
        expect(historyMock.location.state).toStrictEqual(params.state);

        if (historyType === 'memory') {
          // eslint-disable-next-line unicorn/no-useless-undefined
          expect(history.state).toStrictEqual(undefined);
        } else {
          expect(history.state).toStrictEqual({
            ...history.state,
            usr: params.state,
          });
        }
      }

      historyMock.destroy();
    });
  };

  const paramVariants: Partial<NavigationTestParams>[] = [
    {},
    {
      params: { replace: true },
    },
    {
      params: { state: { foo: 1 } },
    },
    {
      params: { replace: true, state: { foo: 1 } },
    },
    {
      type: 'hash',
    },
    {
      type: 'hash',
      params: { replace: true },
    },
    {
      type: 'hash',
      params: { state: { foo: 1 } },
    },
    {
      type: 'hash',
      params: { replace: true, state: { foo: 1 } },
    },
  ];

  historyTypes.forEach((historyType) => {
    describe(`${historyType} router`, () => {
      navigationUrls.forEach((to) => {
        paramVariants.forEach((paramVariant) => {
          createSingleNavigationTest({
            historyType,
            to,
            ...paramVariant,
          });
        });
      });
    });
  });
});
